import { effect, state } from 'g2o-reactive';
import { Constants } from './constants';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { Board } from './IBoard';
import { compose_2d_3x3_transform } from './math/compose_2d_3x3_transform';
import { G20, SpinorLike, spinor_from_like, VectorLike, vector_from_like } from './math/G20';
import { Matrix } from './math/Matrix';
import { Disposable, dispose } from './reactive/Disposable';
import { transform_value_of_matrix } from './renderers/SVGView';
import { Shape, ShapeHost, SVGAttributes } from './Shape';
import { computed_world_matrix } from './utils/compute_world_matrix';

export interface Parent {
    update?(): void;
}

export interface ShapeOptions {
    id?: string;
    opacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    visibility?: 'visible' | 'hidden' | 'collapse';
    plumb?: boolean;
    sx?: number;
    sy?: number;
}

export interface ShapeProperties {
    id: string;
    opacity: number;
    /**
     * position.
     */
    X: G20;
    /**
     * attitude.
     */
    R: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
}

export function ensure_identifier(options: ShapeOptions): string {
    if (typeof options.id === 'string') {
        return options.id;
    }
    else {
        return `${Constants.Identifier}${Constants.uniqueId()}`;
    }
}

export abstract class ShapeBase extends ElementBase implements Shape, ShapeProperties {

    readonly #disposables: Disposable[] = [];

    /**
     * The matrix value of the shape's position, rotation, and scale.
     */
    readonly #matrix: Matrix = new Matrix();

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

    /**
     * Using a G20 for the skewX and skewY gives us the #skew.change$ observable.
     */
    readonly #skew: G20 = new G20(0, 0);

    readonly #opacity = state(1);
    readonly #visibility = state('visible' as 'visible' | 'hidden' | 'collapse');

    readonly #plumb = state(false);

    readonly #mask = state(null as Shape | null);

    // TODO: Remove the properties that don't generally apply
    abstract getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    abstract hasBoundingBox(): boolean;

    constructor(readonly board: Board, options: ShapeOptions = {}) {

        super(options.id);

        this.flagReset(true);

        /**
         * The transformation matrix of the shape in the scene.
         */
        this.worldMatrix = new Matrix();

        if (options.position) {
            this.#position = vector_from_like(options.position);
        }
        else {
            this.#position = new G20(0, 0);
        }

        if (options.attitude) {
            this.#attitude = spinor_from_like(options.attitude);
        }
        else {
            this.#attitude = new G20(0, 0, 1, 0);
        }

        if (typeof options.plumb === 'boolean') {
            this.#plumb.set(options.plumb);
        }

        if (typeof options.opacity === 'number') {
            this.#opacity.set(options.opacity);
        }

        if (options.visibility) {
            this.#visibility.set(options.visibility);
        }

        const scale = { sx: 1, sy: 1 };
        if (typeof options.sx === 'number') {
            scale.sx = options.sx;
        }
        if (typeof options.sy === 'number') {
            scale.sy = options.sy;
        }
        this.#scale.set(scale.sx, scale.sy);

        /**
         * Skew the shape by an angle in the x axis direction.
         */
        this.skewX = 0;

        /**
         * Skew the shape by an angle in the y axis direction.
         */
        this.skewY = 0;

        this.#disposables.push(this.#position.change$.subscribe(() => {
            update_matrix(this.#position, this.#attitude, this.#scale, this.skewX, this.skewY, this.plumb, this.board.goofy, this.board.crazy, this.#matrix);
        }));
        this.#disposables.push(this.#attitude.change$.subscribe(() => {
            update_matrix(this.#position, this.#attitude, this.#scale, this.skewX, this.skewY, this.plumb, this.board.goofy, this.board.crazy, this.#matrix);
        }));
        this.#disposables.push(this.#scale.change$.subscribe(() => {
            update_matrix(this.#position, this.#attitude, this.#scale, this.skewX, this.skewY, this.plumb, this.board.goofy, this.board.crazy, this.#matrix);
        }));
        this.#disposables.push(this.#skew.change$.subscribe(() => {
            update_matrix(this.#position, this.#attitude, this.#scale, this.skewX, this.skewY, this.plumb, this.board.goofy, this.board.crazy, this.#matrix);
        }));
    }

    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    render(shapeHost: ShapeHost, parentElement: unknown, svgElement: unknown): void {
        // clip-path
        this.zzz.disposables.push(effect(() => {
            const mask = this.mask;
            if (mask) {
                this.mask.render(shapeHost, parentElement, svgElement);
                shapeHost.setAttribute(this.zzz.elem, 'clip-path', 'url(#' + this.mask.id + ')');
            }
            else {
                shapeHost.removeAttribute(this.zzz.elem, 'clip-path');
            }
        }));

        // id
        this.zzz.disposables.push(effect(() => {
            if (typeof this.id === 'string') {
                shapeHost.setAttribute(this.zzz.elem, 'id', this.id);
            }
            else {
                shapeHost.removeAttribute(this.zzz.elem, 'id');
            }
        }));

        // opacity
        this.zzz.disposables.push(effect(() => {
            const opacity = this.opacity;
            const change: SVGAttributes = { opacity: `${opacity}` };
            if (opacity === 1) {
                shapeHost.removeAttribute(this.zzz.elem, 'opacity');
            }
            else {
                shapeHost.setAttributes(this.zzz.elem, change);
            }
            return function () {
                // No cleanup to be done.
            };
        }));

        // transform
        this.zzz.disposables.push(effect(() => {
            if (this.matrix.isOne()) {
                shapeHost.removeAttribute(this.zzz.elem, 'transform');
            }
            else {
                shapeHost.setAttribute(this.zzz.elem, 'transform', transform_value_of_matrix(this.matrix));
            }
        }));

        // visibility
        this.zzz.disposables.push(effect(() => {
            const visibility = this.visibility;
            switch (visibility) {
                case 'visible': {
                    const change: SVGAttributes = { visibility };
                    shapeHost.removeAttributes(this.zzz.elem, change);
                    break;
                }
                default: {
                    const change: SVGAttributes = { visibility };
                    shapeHost.setAttributes(this.zzz.elem, change);
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
        super.flagReset(dirtyFlag);
        return this;
    }
    get X(): G20 {
        return this.#position;
    }
    set X(X: G20 | [x: number, y: number] | { x: number, y: number }) {
        if (X instanceof G20) {
            this.#position.copyVector(X);
        }
        else if (Array.isArray(X)) {
            this.#position.set(X[0], X[1]);
        }
        else if (X === null) {
            throw new Error();
        }
        else if (typeof X === 'object') {
            const duck = X as { x: number, y: number };
            const x = duck.x;
            const y = duck.y;
            if (typeof x === 'number' && typeof y === 'number') {
                this.#position.set(x, y);
            }
        }
    }
    get plumb(): boolean {
        return this.#plumb.get();
    }
    set plumb(plumb: boolean) {
        this.#plumb.set(plumb);
    }
    get R(): G20 {
        return this.#attitude;
    }
    set R(attitude: G20) {
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
    set scale(scale: number | [sx: number, sy: number]) {
        if (typeof scale === 'number') {
            this.#scale.set(scale, scale);
        }
        else if (Array.isArray(scale)) {
            this.#scale.set(scale[0], scale[1]);
        }
    }
    get sx(): number {
        return this.#scale.x;
    }
    set sx(sx: number) {
        this.#scale.x = sx;
    }
    get sy(): number {
        return this.#scale.y;
    }
    set sy(sy: number) {
        this.#scale.y = sy;
    }
    get skewX(): number {
        return this.#skew.x;
    }
    set skewX(skewX: number) {
        this.#skew.x = skewX;
    }
    get skewY(): number {
        return this.#skew.y;
    }
    set skewY(skewY: number) {
        this.#skew.y = skewY;
    }
    get mask(): Shape | null {
        return this.#mask.get();
    }
    set mask(mask: Shape | null) {
        this.#mask.set(mask);
        this.zzz.flags[Flag.ClipPath] = true;
        if (mask instanceof ShapeBase && !mask.zzz.ismask) {
            mask.zzz.ismask = true;
        }
    }
    get matrix(): Matrix {
        return this.#matrix;
        // return this.#matrix.get();
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
/*
function compute_matrix(position: G20, attitude: G20, scale: G20, skewX: number, skewY: number, plumb: boolean, goofy: boolean, crazy: boolean): Matrix {
    const M = new Matrix();
    update_matrix(position, attitude, scale, skewX, skewY, plumb, goofy, crazy, M);
    return M;
}
*/

function update_matrix(position: G20, attitude: G20, scale: G20, skewX: number, skewY: number, plumb: boolean, goofy: boolean, crazy: boolean, M: Matrix): void {
    // For performance, the matrix product has been pre-computed.
    // M = T * S * R * skewX * skewY
    const x = position.x;
    const y = position.y;
    const sx = scale.x;
    const sy = scale.y;
    if (goofy) {
        if (plumb) {
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
        if (plumb) {
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
}
