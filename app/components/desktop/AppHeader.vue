<script setup lang="ts">
import Icon from "@/components/header/Icon.vue";
import type { IHeaderData } from "@/models/IHeader";

const { data } = await useFetch<IHeaderData>("/api/header", {
	// works nicely with routeRules ISR on the page
	server: true,
});

const accountItems = computed(() =>
	(data.value?.accountMenu ?? []).map((x) => ({
		label: x.label,
		to: x.to,
		icon: x.icon,
		danger: !!x.danger,
	}))
);
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
						class="flex items-center justify-end px-4 sm:px-6 w-[100px] md:w-[160px] lg:w-[250px] xl:w-[300px]"
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
					<div class="mx-auto max-w-7xl">
						<!-- your TOP content row -->
						<div class="flex items-center justify-between gap-3">
							<!-- top nav desktop -->
							<div class="flex h-18 items-center justify-between gap-3 px-2">
								<!-- Center: Top nav (desktop) -->
								<nav
									class="hidden md:flex items-center gap-2 md:gap-2 lg:gap-4 xl:gap-8 text-[12px] md:text-[12px] xl:text-[13px] font-semibold"
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
											align="center"
										>
											{{ item.label }}
										</DropdownItems>
									</span>
								</nav>
							</div>

							<UserSetting :data="data" :account-items="accountItems" />
						</div>
					</div>
				</div>

				<!-- BLACK BOTTOM STRIP full width -->
				<div class="bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
					<div class="mx-auto max-w-7xl">
						<div class="bg-black px-2">
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
										class="hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-2 py-1.5 text-[12px] font-semibold dark:text-warning"
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
}
</style>
