let next_unique_id = 0;

export const Constants = {
    Identifier: "g20-",

    /**
     * Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    Resolution: 12,

    uniqueId: function (): number {
        return next_unique_id++;
    },
};
