<template>
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center px-4"
    aria-busy="true"
    aria-live="polite"
  >
    <!-- backdrop -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    <!-- card -->
    <div class="relative w-full max-w-xs sm:max-w-sm loader-card">
      <!-- top gold shimmer bar -->
      <div class="h-[3px] w-full shimmer" />

      <div class="px-5 py-6 flex items-center gap-4">
        <!-- spinner -->
        <UIcon
          name="i-heroicons-arrow-path-20-solid"
          class="h-5 w-5 text-amber-300 animate-spin"
        />

        <div class="flex-1">
          <div
            class="text-[13px] font-extrabold tracking-wider text-amber-200 uppercase"
          >
            Đang tải
          </div>
          <div class="mt-0.5 text-[11px] text-white/60">
            Vui lòng chờ trong giây lát
          </div>
        </div>

        <!-- pulse dot -->
        <span class="h-2 w-2 rounded-full bg-amber-300/90 pulse-dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card look + entrance animation */
.loader-card {
  border-radius: 22px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45);

  animation: popIn 220ms ease-out both;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Gold shimmer animation */
.shimmer {
  background: linear-gradient(
    90deg,
    rgba(252, 211, 77, 0.25),
    rgba(252, 211, 77, 0.95),
    rgba(252, 211, 77, 0.25)
  );
  background-size: 200% 100%;
  animation: shimmerMove 1.4s ease-in-out infinite;
}

@keyframes shimmerMove {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Pulse dot (smoother than animate-pulse) */
.pulse-dot {
  animation: dotPulse 900ms ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1.25); opacity: 1; }
}
</style>
