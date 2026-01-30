import { defineNuxtPlugin, useRequestHeaders } from "#app";
import { screenMode } from "@/hooks/useScreenMode";

function isMobileUA(ua = "") {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

export default defineNuxtPlugin(() => {
  // ✅ SSR: infer from UA
  if (import.meta.server) {
    const headers = useRequestHeaders(["user-agent"]);
    const ua = headers["user-agent"] || "";
    screenMode.value = isMobileUA(ua) ? "phone" : "pc";
    return;
  }

  // ✅ Client: precise with width
  const calc = (w: number) => (w >= 960 ? "pc" : w >= 770 ? "pad" : "phone");
  const update = () => (screenMode.value = calc(window.innerWidth));

  update();
  window.addEventListener("resize", update, { passive: true });
});
