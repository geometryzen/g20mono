import { Anchor } from "../anchor";
import { Flag } from '../Flag';
import { G20 } from "../math/G20";
import { Disposable, dispose } from "../reactive/Disposable";
import { Observable } from "../reactive/Observable";
import { variable, Variable } from '../reactive/variable';

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

    /**
     * The ismask property indicates that this path is being used as the mask for some other shape.
     */
    readonly #ismask = variable(false);
    readonly ismask$ = this.#ismask.asObservable();
    /**
     * SVGClipPathElement
     */
    svgClipPathElement?: unknown;

    context?: {
        ctx?: CanvasRenderingContext2D;
    };
    /**
     * Used by the CanvasRenderer.
     */
    effect?: CanvasPattern;
    /**
     * The element corresponding to some Shape and used by the SVG renderer. It will share the same identifier.
     * This is a handle to some kind of SVG element.
     */
    elem?: unknown;
    /**
     * A flag that reminds us that the fill (ColorProvider) has been rendered into the SVGDefsElement.
     */
    hasFillEffect?: boolean;
    /**
     * A flag that reminds us that the stroke (ColorProvider) has been rendered into the SVGDefsElement.
     */
    hasStrokeEffect?: boolean;
    image?: SVGImageElement;
    offset?: G20;

    readonly vertices: Anchor[] = [];
    readonly vertices_subject?: Variable<number> = variable(0);
    readonly vertices$?: Observable<number> = this.vertices_subject.asObservable();

    dispose(): void {
        dispose(this.disposables);
    }

    get ismask(): boolean {
        return this.#ismask.get();
    }
    set ismask(ismask: boolean) {
        this.#ismask.set(ismask);
        this.flags[Flag.ClipFlag] = true;
    }
}