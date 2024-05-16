import { computed, signal } from "@g20/reactive";

describe("Signal", function () {
    it("signal", function () {
        const x = signal(5);
        const y = signal(3);
        const z = computed(() => x.get() + y.get());
        expect(z.get()).toBe(8);
        x.set(10);
        expect(z.get()).toBe(13);
    });
});
