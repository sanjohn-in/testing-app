<script setup lang="ts">
const props = defineProps<{
	error: {
		statusCode?: number;
		statusMessage?: string;
		message?: string;
		url?: string;
	};
}>();

const code = computed(() => props.error?.statusCode ?? 404);
const title = computed(() =>
	code.value === 404 ? "Page not found" : "Something went wrong"
);
const desc = computed(() =>
	code.value === 404
		? "The page you're looking for doesn't exist (or it moved)."
		: "An unexpected error happened. Please try again."
);

function goHome() {
	clearError({ redirect: "/" });
}
function goBack() {
	// If history exists, go back; otherwise go home
	if (import.meta.client && window.history.length > 1) window.history.back();
	else goHome();
}
</script>

<template>
	<UApp>
		<div class="relative min-h-screen overflow-hidden">
			<!-- background -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-amber-200 via-yellow-100 to-zinc-900"
			/>
			<div
				class="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(251,191,36,0.35),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(0,0,0,0.55),transparent_55%)]"
			/>

			<!-- floating blobs -->
			<div class="blob blob-a" />
			<div class="blob blob-b" />

			<!-- content -->
			<div
				class="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10"
			>
				<div class="w-full">
					<div class="mx-auto max-w-2xl text-center">
						<div
							class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur"
						>
							<span
								class="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300 animate-pulse"
							/>
							Error {{ code }}
						</div>

						<div class="mt-8">
							<div class="glow">
								<div class="code-404">
									{{ code }}
								</div>
							</div>

							<h1
								class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
							>
								{{ title }}
							</h1>
							<p class="mt-3 text-base text-white/80 sm:text-lg">
								{{ desc }}
							</p>

							<div
								class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
							>
								<UButton
									size="lg"
									class="w-full sm:w-auto"
									color="primary"
									@click="goHome"
								>
									Go Home
								</UButton>

								<UButton
									size="lg"
									class="w-full sm:w-auto"
									variant="outline"
									color="neutral"
									@click="goBack"
								>
									Go Back
								</UButton>
							</div>

							<div class="mt-8 text-sm text-white/70">
								<span class="opacity-80">Tip:</span> Check the URL or go back to
								the homepage.
							</div>
						</div>
					</div>

					<!-- small “card” preview area -->
					<div class="mx-auto mt-12 max-w-3xl">
						<div
							class="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur"
						>
							<div
								class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
							>
								<div class="text-left">
									<div
										class="text-xs font-semibold uppercase tracking-wider text-white/70"
									>
										Requested URL
									</div>
									<div
										class="mt-1 truncate rounded-lg bg-black/30 px-3 py-2 font-mono text-sm text-white/90"
									>
										{{ props.error?.url || "unknown" }}
									</div>
								</div>

								<div class="text-left">
									<div
										class="text-xs font-semibold uppercase tracking-wider text-white/70"
									>
										Message
									</div>
									<div
										class="mt-1 truncate rounded-lg bg-black/30 px-3 py-2 font-mono text-sm text-white/90"
									>
										{{
											props.error?.statusMessage ||
											props.error?.message ||
											"No details"
										}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</UApp>
</template>

<style scoped>
/* big 404 with a gentle “bounce” */
.code-404 {
	font-size: clamp(84px, 12vw, 180px);
	line-height: 0.9;
	font-weight: 900;
	letter-spacing: -0.06em;
	color: rgba(255, 255, 255, 0.92);
	text-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
	animation: floaty 2.6s ease-in-out infinite;
}

.glow {
	display: inline-block;
	padding: 18px 22px;
	border-radius: 24px;
	background: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0.16),
		rgba(0, 0, 0, 0.1)
	);
	box-shadow:
		0 20px 60px rgba(0, 0, 0, 0.35),
		inset 0 1px 0 rgba(255, 255, 255, 0.16);
	backdrop-filter: blur(10px);
}

/* animated blobs */
.blob {
	position: absolute;
	width: 520px;
	height: 520px;
	border-radius: 9999px;
	filter: blur(40px);
	opacity: 0.55;
	transform: translate3d(0, 0, 0);
}
.blob-a {
	left: -180px;
	top: -180px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(251, 191, 36, 0.9),
		rgba(255, 255, 255, 0.2) 50%,
		transparent 70%
	);
	animation: blobMoveA 10s ease-in-out infinite;
}
.blob-b {
	right: -220px;
	bottom: -220px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 255, 255, 0.7),
		rgba(251, 191, 36, 0.18) 45%,
		transparent 72%
	);
	animation: blobMoveB 12s ease-in-out infinite;
}

@keyframes floaty {
	0%,
	100% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
}
@keyframes blobMoveA {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(60px, 40px) scale(1.08);
	}
}
@keyframes blobMoveB {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(-70px, -50px) scale(1.06);
	}
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
	.code-404,
	.blob-a,
	.blob-b {
		animation: none !important;
	}
}
</style>
