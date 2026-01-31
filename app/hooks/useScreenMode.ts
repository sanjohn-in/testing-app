// hooks/useScreenMode.ts
import { ref } from "vue";

export type ScreenMode = "pc" | "pad" | "phone";
export const screenMode = ref<ScreenMode>("pc");

let inited = false;

function calc(width: number): ScreenMode {
  if (width >= 960) return "pc";
  if (width >= 695) return "pad";
  return "phone";
}

function update() {
  if (!import.meta.client) return;
  screenMode.value = calc(window.innerWidth);
}

export function initScreenMode() {
  if (!import.meta.client || inited) return;
  inited = true;

  update();

  const onResize = () => update();
  window.addEventListener("resize", onResize, { passive: true });

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener("resize", onResize);
      inited = false;
    });
  }
}
