import { computed, state } from "@g20/reactive";

describe("Signal", function () {
    it("state", function () {
        const x = state(5);
        const y = state(3);
        const z = computed(() => x.get() + y.get());
        expect(z.get()).toBe(8);
        x.set(10);
        expect(z.get()).toBe(13);
    });
});
