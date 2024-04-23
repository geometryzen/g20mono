import { Anchor } from "../anchor";
import { Color } from '../effects/ColorProvider';
import { Flag } from '../Flag';
import { G20 } from "../math/G20";
import { Disposable, dispose } from "../reactive/Disposable";
import { Observable } from "../reactive/Observable";
import { variable, Variable } from '../reactive/variable';
import { TextDecoration } from '../text';

/**
 * Information that is shared between the model and the view.
 */
export class ZZZ implements Disposable {
    /**
     * 
     */
    readonly disposables: Disposable[] = [];
    /*
     *
     */
    readonly flags: { [flag: number]: boolean } = {};

    appended?: boolean;
    anchor$?: Observable<'start' | 'middle' | 'end'>;
    baseline$?: Observable<'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top'>;

    /**
     * The clip property indicates that this path is being used as the clipPath for some other shape.
     */
    readonly #clip = variable(false);
    readonly clip$ = this.#clip.asObservable();
    clipPath?: SVGClipPathElement;

    context?: {
        ctx?: CanvasRenderingContext2D;
    };
    decoration$?: Observable<TextDecoration[]>;
    direction$?: Observable<'ltr' | 'rtl'>;
    dx$?: Observable<number | string>;
    dy$?: Observable<number | string>;
    /**
     * Used by the CanvasRenderer.
     */
    effect?: CanvasPattern;
    /**
     * The element corresponding to some Shape and used by the SVG renderer. It will share the same identifier.
     */
    elem?: HTMLElement | SVGElement;
    fill$?: Observable<Color>;
    fillOpacity$?: Observable<number>;
    fontStyle$?: Observable<'normal' | 'italic' | 'oblique'>;
    fontWeight$?: Observable<'normal' | 'bold' | 'bolder' | 'lighter' | number>;
    /**
     * DGH: Something strange in use.
     */
    hasFillEffect?: boolean;
    /**
     * DGH: Something strange in use.
     */
    hasStrokeEffect?: boolean;
    height$?: Observable<number>;
    image?: SVGImageElement;
    offset?: G20;
    opacity$?: Observable<number>;
    radius$?: Observable<number>;
    scale?: G20;
    spreadMethod$: Observable<'pad' | 'reflect' | 'repeat'>;
    stroke$?: Observable<Color>;
    strokeOpacity$?: Observable<number>;
    strokeWidth$?: Observable<number>;
    textContent$?: Observable<string>;
    units$?: Observable<'userSpaceOnUse' | 'objectBoundingBox'>;

    vertices?: Anchor[];
    vertices_subject?: Variable<number>;
    vertices$?: Observable<number>;

    visibility$?: Observable<'visible' | 'hidden' | 'collapse'>;
    width$?: Observable<number>;

    dispose(): void {
        dispose(this.disposables);
    }
    get clip(): boolean {
        return this.#clip.get();
    }
    set clip(clip: boolean) {
        this.#clip.set(clip);
        this.flags[Flag.ClipFlag] = true;
    }
}