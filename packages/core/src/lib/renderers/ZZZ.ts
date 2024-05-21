import { Anchor } from "../Anchor";
import { Flag } from "../Flag";
import { G20 } from "../math/G20";
import { Disposable, dispose } from "../reactive/Disposable";
import { Observable } from "../reactive/Observable";
import { variable, Variable } from "../reactive/variable";

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
     * TODO: What if it is being used multiple times?
     */
    readonly #ismask = variable(false);
    readonly ismask$ = this.#ismask.asObservable();
    /**
     * SVGClipPathElement, TODO: Rename clipPath.
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
     * The visual element corresponding to some Shape.
     */
    viewee?: unknown;
    /**
     * A flag that reminds us that the fill (ColorProvider) has been rendered into the SVGDefsElement.
     */
    hasFillEffect?: boolean;
    /**
     * A flag that reminds us that the stroke (ColorProvider) has been rendered into the SVGDefsElement.
     */
    hasStrokeEffect?: boolean;
    /**
     * SVGImageElement as a handle.
     */
    image?: unknown;
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
