import { computed, effect, Readable, state } from 'g2o-reactive';
import { Anchor } from './anchor';
import { Constants } from './constants';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { Board } from './IBoard';
import { IShape } from './IShape';
import { compose_2d_3x3_transform } from './math/compose_2d_3x3_transform';
import { G20 } from './math/G20';
import { Matrix } from './matrix';
import { Disposable, dispose } from './reactive/Disposable';
import { svg, SVGAttributes, transform_value_of_matrix } from './renderers/SVGView';
import { computed_world_matrix } from './utils/compute_world_matrix';

export type PositionLike = Anchor | G20 | Shape | [x: number, y: number];

function ensure_mutable(mv: G20): G20 {
    if (mv.isMutable()) {
        return mv;
    }
    else {
        return mv.clone();
    }
}

export function position_from_like(like: PositionLike): G20 | null {
    if (like instanceof Shape) {
        return ensure_mutable(like.position);
    }
    if (like instanceof G20) {
        return ensure_mutable(like);
    }
    else if (like instanceof Anchor) {
        return ensure_mutable(like.origin);
    }
    else if (Array.isArray(like)) {
        return G20.vector(like[0], like[1]);
    }
    else {
        return null;
    }
}

export interface Parent {
    update?(): void;
}

export interface ShapeAttributes {
    id?: string;
    opacity?: number;
    position?: PositionLike;
    attitude?: G20;
    visibility?: 'visible' | 'hidden' | 'collapse';
    compensate?: boolean;
}

export interface ShapeProperties {
    id: string;
    opacity: number;
    /**
     * alias for the position property.
     */
    X: G20;
    position: G20;
    /**
     * alias for the attitude property.
     */
    R: G20;
    attitude: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
}

function ensure_identifier(attributes: ShapeAttributes): string {
    if (typeof attributes.id === 'string') {
        return attributes.id;
    }
    else {
        return `${Constants.Identifier}${Constants.uniqueId()}`;
    }
}

export abstract class Shape extends ElementBase<unknown> implements IShape<unknown>, ShapeProperties {

    readonly #disposables: Disposable[] = [];

    /**
     * The matrix value of the shape's position, rotation, and scale.
     */
    readonly #matrix: Readable<Matrix>;

    /**
     * The matrix value of the shape's position, rotation, and scale in the scene.
     */
    #worldMatrix: Matrix = null;

    readonly #position: G20;
    readonly #attitude: G20;

    /**
     * The scale supports non-uniform scaling.
     * The API provides more convenient access for uniform scaling.
     * Make the easy things easy...
     */
    readonly #scale: G20 = new G20(1, 1);

    readonly #skewX = state(0);

    readonly #skewY = state(0);

    readonly #opacity = state(1);
    readonly #visibility = state('visible' as 'visible' | 'hidden' | 'collapse');

    readonly #compensate: boolean;

    readonly #clipPath = state(null as Shape | null);

    // TODO: Remove the properties that don't generally apply
    abstract getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    abstract hasBoundingBox(): boolean;

    constructor(readonly board: Board, attributes: ShapeAttributes = {}) {

        super(ensure_identifier(attributes));

        this.flagReset(true);

        /**
         * The transformation matrix of the shape in the scene.
         */
        this.worldMatrix = new Matrix();

        if (attributes.position) {
            this.#position = position_from_like(attributes.position);
        }
        else {
            this.#position = new G20(0, 0);
        }

        if (attributes.attitude) {
            this.#attitude = attributes.attitude;
        }
        else {
            this.#attitude = new G20(0, 0, 1, 0);
        }

        if (attributes.compensate) {
            this.#compensate = attributes.compensate;
        }
        else {
            this.#compensate = false;
        }

        if (typeof attributes.opacity === 'number') {
            this.#opacity.set(attributes.opacity);
        }

        if (attributes.visibility) {
            this.#visibility.set(attributes.visibility);
        }

        /**
         * The value for how much the shape is scaled relative to its parent.
         */
        this.scale = 1.0;

        /**
         * Skew the shape by an angle in the x axis direction.
         */
        this.skewX = 0;

        /**
         * Skew the shape by an angle in the y axis direction.
         */
        this.skewY = 0;
        /**
         * 
         */
        this.#matrix = computed(() => update_matrix(this.#position, this.#attitude, this.#scale, this.skewX, this.skewY, this.#compensate, this.board.goofy, this.board.crazy));

        /*
        this.#disposables.push(effect(()=>{
            this.#update_matrix(this.#compensate);
        }));
        */
    }

    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void {
        // clip-path
        this.zzz.disposables.push(effect(() => {
            const clipPath = this.clipPath;
            if (clipPath) {
                this.clipPath.render(parentElement, svgElement);
                this.zzz.elem.setAttribute('clip-path', 'url(#' + this.clipPath.id + ')');
            }
            else {
                this.zzz.elem.removeAttribute('clip-path');
            }
        }));

        // id
        this.zzz.disposables.push(effect(() => {
            this.zzz.elem.setAttribute('id', this.id);
        }));

        // opacity
        this.zzz.disposables.push(effect(() => {
            const opacity = this.opacity;
            const change: SVGAttributes = { opacity: `${opacity}` };
            if (opacity === 1) {
                svg.removeAttributes(this.zzz.elem, change);
            }
            else {
                svg.setAttributes(this.zzz.elem, change);
            }
            return function () {
                // No cleanup to be done.
            };
        }));

        // transform
        this.zzz.disposables.push(effect(() => {
            this.zzz.elem.setAttribute('transform', transform_value_of_matrix(this.matrix));
        }));

        // visibility
        this.zzz.disposables.push(effect(() => {
            const visibility = this.visibility;
            switch (visibility) {
                case 'visible': {
                    const change: SVGAttributes = { visibility };
                    svg.removeAttributes(this.zzz.elem, change);
                    break;
                }
                default: {
                    const change: SVGAttributes = { visibility };
                    svg.setAttributes(this.zzz.elem, change);
                    break;
                }
            }
            return function () {
                // No cleanup to be done.
            };
        }));
    }

    update(): this {
        // There's no update on the super type.
        return this;
    }

    flagReset(dirtyFlag = false): this {
        this.zzz.flags[Flag.Vertices] = dirtyFlag;
        this.zzz.flags[Flag.Scale] = dirtyFlag;
        super.flagReset(dirtyFlag);
        return this;
    }
    get X(): G20 {
        return this.#position;
    }
    set X(pos: G20) {
        if (pos instanceof G20) {
            this.#position.copyVector(pos);
        }
    }
    get position(): G20 {
        return this.#position;
    }
    set position(position: G20) {
        if (position instanceof G20) {
            this.#position.copyVector(position);
        }
    }
    get R(): G20 {
        return this.#attitude;
    }
    set R(attitude: G20) {
        if (attitude instanceof G20) {
            this.#attitude.copySpinor(attitude);
        }
    }
    get attitude(): G20 {
        return this.#attitude;
    }
    set attitude(attitude: G20) {
        if (attitude instanceof G20) {
            this.#attitude.copySpinor(attitude);
        }
    }
    get scale(): number {
        if (this.#scale.x === this.#scale.y) {
            return this.#scale.x;
        }
        else {
            // Some message to indicate non-uniform scaling is in effect.
            throw new Error();
        }
    }
    set scale(scale: number) {
        this.#scale.x = scale;
        this.#scale.y = scale;
        this.zzz.flags[Flag.Scale] = true;
    }
    get scaleXY(): G20 {
        return this.#scale;
    }
    set scaleXY(scale: G20) {
        this.#scale.set(scale.x, scale.y, 0, 0);
        this.zzz.flags[Flag.Scale] = true;
    }
    get skewX(): number {
        return this.#skewX.get();
    }
    set skewX(skewX: number) {
        this.#skewX.set(skewX);
    }
    get skewY(): number {
        return this.#skewY.get();
    }
    set skewY(skewY: number) {
        this.#skewY.set(skewY);
    }
    get clipPath(): Shape | null {
        return this.#clipPath.get();
    }
    set clipPath(clipPath: Shape | null) {
        this.#clipPath.set(clipPath);
        this.zzz.flags[Flag.ClipPath] = true;
        if (clipPath instanceof Shape && !clipPath.zzz.clip) {
            clipPath.zzz.clip = true;
        }
    }
    get matrix(): Matrix {
        return this.#matrix.get();
    }
    get opacity(): number {
        return this.#opacity.get();
    }
    set opacity(opacity: number) {
        if (typeof opacity === 'number') {
            if (opacity >= 0 && opacity <= 1) {
                if (this.opacity !== opacity) {
                    this.#opacity.set(opacity);
                }
            }
        }
    }
    get visibility(): 'visible' | 'hidden' | 'collapse' {
        return this.#visibility.get();
    }
    set visibility(visible: 'visible' | 'hidden' | 'collapse') {
        if (typeof visible === 'string') {
            if (this.visibility !== visible) {
                this.#visibility.set(visible);
            }
        }
    }
    show(): this {
        this.visibility = 'visible';
        return this;
    }
    hide(): this {
        this.visibility = 'hidden';
        return this;
    }
    collapse(): this {
        this.visibility = 'collapse';
        return this;
    }
    get worldMatrix() {
        // TODO: Make DRY
        computed_world_matrix(this, this.#worldMatrix);
        return this.#worldMatrix;
    }
    set worldMatrix(worldMatrix: Matrix) {
        this.#worldMatrix = worldMatrix;
    }
}

/**
 * @param position 
 * @param attitude 
 * @param scale 
 * @param skewX 
 * @param skewY 
 * @param compensate 
 * @param goofy
 * @param crazy 
 */
export function update_matrix(position: G20, attitude: G20, scale: G20, skewX: number, skewY: number, compensate: boolean, goofy: boolean, crazy: boolean): Matrix {
    // For performance, the matrix product has been pre-computed.
    // M = T * S * R * skewX * skewY
    const M = new Matrix();
    const x = position.x;
    const y = position.y;
    const sx = scale.x;
    const sy = scale.y;
    if (goofy) {
        if (compensate) {
            if (crazy) {
                const a = attitude.a;
                const b = -attitude.b;
                const cos_φ = (b - a) / Math.SQRT2;
                const sin_φ = (a + b) / Math.SQRT2;
                compose_2d_3x3_transform(y, x, sy, sx, cos_φ, sin_φ, skewY, skewX, M);
            }
            else {
                const cos_φ = attitude.a;
                const sin_φ = -attitude.b;
                compose_2d_3x3_transform(x, y, sx, sy, cos_φ, sin_φ, skewX, skewY, M);
            }
        }
        else {
            if (crazy) {
                const cos_φ = attitude.a;
                const sin_φ = attitude.b;
                compose_2d_3x3_transform(y, x, sy, sx, cos_φ, sin_φ, skewY, skewX, M);    
            }
            else {
                const cos_φ = attitude.a;
                const sin_φ = -attitude.b;
                compose_2d_3x3_transform(x, y, sx, sy, cos_φ, sin_φ, skewX, skewY, M);    
            }
        }
    }
    else {
        if (compensate) {
            if (crazy) {
                const cos_φ = attitude.b;
                const sin_φ = attitude.a;
                compose_2d_3x3_transform(x, y, sx, sy, cos_φ, sin_φ, skewX, skewY, M);
            }
            else {
                const a = attitude.a;
                const b = attitude.b;
                const cos_φ = (a - b) / Math.SQRT2;
                const sin_φ = (a + b) / Math.SQRT2;
                compose_2d_3x3_transform(y, x, sy, sx, cos_φ, sin_φ, skewY, skewX, M);
            }
        }
        else {
            if (crazy) {
                const cos_φ = attitude.a;
                const sin_φ = -attitude.b;
                compose_2d_3x3_transform(x, y, sx, sy, cos_φ, sin_φ, skewX, skewY, M);    
            }
            else {
                const cos_φ = attitude.a;
                const sin_φ = attitude.b;
                compose_2d_3x3_transform(y, x, sy, sx, cos_φ, sin_φ, skewY, skewX, M);    
            }
        }
    }
    return M;
}
