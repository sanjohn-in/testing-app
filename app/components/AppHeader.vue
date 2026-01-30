<script setup lang="ts">
import Icon from "@/components/header/Icon.vue";
import type { IHeaderData } from "@/models/IHeader";

const { data } = await useFetch<IHeaderData>("/api/header", {
	// works nicely with routeRules ISR on the page
	server: true,
});

const openMobile = ref(false);

const liveItems = computed(() =>
	(data.value?.liveCategories ?? []).map((x) => ({
		emoji: x.emoji,
		label: x.label,
		to: x.to,
		icon: x.icon,
		value: x.value,
	}))
);

const accountItems = computed(() =>
	(data.value?.accountMenu ?? []).map((x) => ({
		label: x.label,
		to: x.to,
		icon: x.icon,
		danger: !!x.danger,
	}))
);
const selectedValue = ref<string | number | null>(null);
</script>

<template>
	<header class="w-full">
		<div class="flex w-full header-gold">
			<!-- LEFT: LOGO BLACK (fills to left edge) -->
			<div class="shrink-0">
				<div class="h-full flex bg-black rounded-tr-[4rem]">
					<!-- control logo width per breakpoint -->
					<NuxtLink
						to="/"
						class="flex items-center justify-end px-4 sm:px-6 w-[100px] md:w-[160px] lg:w-[340px]"
					>
						<div
							class="text-white text-xl md:text-3xl font-light tracking-widest leading-none"
						>
							{{ data?.brand.title ?? "LOGO" }}
						</div>
					</NuxtLink>
				</div>
			</div>

			<!-- RIGHT: MENUS (fills to right edge) -->
			<div class="flex-1 min-w-0">
				<!-- GOLD TOP STRIP full width -->
				<div class="border-b border-black/35">
					<div class="mx-auto max-w-7xl px-3 sm:px-4">
						<!-- your TOP content row -->
						<div class="flex items-center justify-between gap-3">
							<!-- top nav desktop -->
							<div class="px-3 sm:px-4">
								<div class="flex h-18 items-center justify-between gap-3">
									<!-- Center: Top nav (desktop) -->
									<nav
										class="hidden lg:flex items-center gap-10 text-[13px] font-semibold"
									>
										<span
											v-for="item in data?.topNav"
											:key="item.label"
											class="hover:text-amber-800 text-black transition cursor-pointer"
										>
											<DropdownItems
												:avatar-url="data?.user.avatarUrl || ''"
												:items="item.children"
												width="160px"
											>
												{{ item.label }}
											</DropdownItems>
										</span>
									</nav>
								</div>
							</div>

							<!-- user bar (same as yours) -->
							<div class="flex flex-col gap-1">
								<div class="hidden sm:block text-center">
									<div class="text-[11px] leading-4 text-black">
										Xin chào,
										<span class="font-semibold">{{ data?.user.name }}</span>
									</div>
								</div>
								<div
									class="flex items-center gap-1 bg-zinc-800 rounded-4xl px-1.5"
								>
									<!-- balance capsule -->
									<SelectDropdown
										v-model="selectedValue"
										:items="liveItems"
										width="180px"
									>
										<div
											class="flex items-center gap-2 rounded-full bg-white px-2 py-2 ring-1 ring-black/10 cursor-pointer"
										>
											<span class="text-[12px] font-semibold text-black/80"
												>🪙</span
											>
											<span class="text-[12px] font-bold text-black">
												{{ data?.user.balance ?? 0 }}
											</span>

											<button
												class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 ring-1 ring-black/10 hover:brightness-95"
												aria-label="Add"
											>
												<Icon name="plus" class="h-3.5 w-3.5 text-black" />
											</button>
										</div>
									</SelectDropdown>
									<!-- <UDropdownMenu
										:items="[
											liveItems.map((i) => ({
												label: i.label,
												click: () => navigateTo(i.to),
											})),
										]"
										:popper="{ placement: 'bottom-start' }"
										:ui="{}"
									>
										<div
											class="flex items-center gap-2 rounded-full bg-white px-2 py-2 ring-1 ring-black/10 cursor-pointer"
										>
											<span class="text-[12px] font-semibold text-black/80"
												>🪙</span
											>
											<span class="text-[12px] font-bold text-black">
												{{ data?.user.balance ?? 0 }}
											</span>

											<button
												class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 ring-1 ring-black/10 hover:brightness-95"
												aria-label="Add"
											>
												<Icon name="plus" class="h-3.5 w-3.5 text-black" />
											</button>
										</div>
									</UDropdownMenu> -->

									<!-- notifications -->
									<button
										class="relative inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-black/10 hover:bg-white/75"
										aria-label="Notifications"
									>
										<Icon name="bell" class="h-6 w-6 text-amber-300" />
										<span
											v-if="(data?.user.notifications ?? 0) > 0"
											class="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1 text-center text-[10px] font-bold text-white"
										>
											{{ data?.user.notifications }}
										</span>
									</button>

									<!-- messages -->
									<button
										class="relative hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/75"
										aria-label="Messages"
									>
										<Icon name="mail" class="h-6 w-6 text-amber-300" />
										<span
											v-if="(data?.user.messages ?? 0) > 0"
											class="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1 text-center text-[10px] font-bold text-white"
										>
											{{ data?.user.messages }}
										</span>
									</button>
									<!-- calaendar -->
									<button
										class="relative hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/75"
										aria-label="Messages"
									>
										<Icon name="calendar" class="h-6 w-6 text-amber-300" />
										<span
											v-if="(data?.user.messages ?? 0) > 0"
											class="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1 text-center text-[10px] font-bold text-white"
										>
											{{ data?.user.messages }}
										</span>
									</button>
									<!-- account dropdown (Nuxt UI) -->
									<DropdownItems
										:avatar-url="data?.user.avatarUrl || ''"
										:level="data?.user.level || 0"
										:items="accountItems"
									>
										<button
											class="flex cursor-pointer relative items-center gap-2 rounded-full bg-black/20 px-2 py-1.5 hover:bg-black/25 transition"
										>
											<NuxtImg
												:src="data?.user.avatarUrl"
												class="h-9 w-9 rounded-full ring-2 ring-white/70"
											/>
											<div class="text-[10px] level">
												{{ data?.user.level }}
											</div>
										</button>
									</DropdownItems>
									<!-- mobile menu button -->
									<button
										class="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-black/10"
										@click="openMobile = !openMobile"
									>
										<span class="text-amber-300 text-xl cursor-pointer">≡</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- BLACK BOTTOM STRIP full width -->
				<div class="bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
					<div class="mx-auto max-w-7xl">
						<div class="bg-black px-3 sm:px-4">
							<div class="flex h-11 items-center justify-between gap-3">
								<!-- Left: live dropdown like figma -->
								<div class="flex items-center gap-2">
									<!-- sub nav -->
									<nav
										class="hidden md:flex items-center gap-6 text-[12px] font-semibold text-gold-100/90"
									>
										<NuxtLink
											v-for="item in data?.subNav"
											:key="item.label"
											:to="item.to"
											class="group inline-flex items-center gap-1.5 hover:text-amber-400 transition text-amber-200"
										>
											<Icon :name="item.icon" class="h-4 w-4 text-gold-200" />
											<span>{{ item.label }}</span>
										</NuxtLink>
									</nav>
								</div>

								<!-- Right: language + toggle -->
								<div class="flex items-center gap-2">
									<button
										class="hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold dark:text-warning"
									>
										<span
											class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px]"
										>
											★
										</span>
										<span>{{ data?.locale.current }}</span>
									</button>

									<div class="ring-2 ring-amber-400 rounded-full">
										<UColorModeSwitch size="xl" color="warning" />
									</div>
								</div>
							</div>

							<!-- mobile sub nav -->
							<div v-if="openMobile" class="md:hidden pb-3">
								<div class="grid grid-cols-2 gap-2 pt-2">
									<NuxtLink
										v-for="item in data?.subNav"
										:key="item.label"
										:to="item.to"
										class="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-[12px] font-semibold text-amber-300"
									>
										<Icon :name="item.icon" class="h-4 w-4 text-gold-200" />
										<span>{{ item.label }}</span>
									</NuxtLink>
								</div>

								<div class="mt-3 grid grid-cols-2 gap-2">
									<NuxtLink
										v-for="item in data?.topNav"
										:key="item.label"
										:to="item.to"
										class="rounded-xl bg-white/10 px-3 py-2 text-[12px] font-semibold text-white"
									>
										{{ item.label }}
									</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
.header-gold {
	background-image:
		linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.22) 0%,
			rgba(255, 255, 255, 0.06) 35%,
			rgba(0, 0, 0, 0.06) 70%,
			rgba(0, 0, 0, 0.14) 100%
		),
		linear-gradient(
			to right,
			#e8c56a 0%,
			#f1d07a 25%,
			#e6bf5e 55%,
			#d7ae48 100%
		);
	/* border-top: 1px solid rgba(0, 0, 0, 0.28); */
	/* border-bottom: 1px solid rgba(0, 0, 0, 0.35); */
}

.level {
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: black;
	color: goldenrod;
	border-radius: 100%;
	padding: 4px;
	border: 1px solid goldenrod;
	font-weight: bold;
}
</style>
