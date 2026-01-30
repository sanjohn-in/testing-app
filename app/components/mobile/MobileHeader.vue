<script setup lang="ts">
import Icon from "@/components/header/Icon.vue";
import type { IHeaderData } from "@/models/IHeader";

const props = defineProps({
	data: {
		type: Object as () => IHeaderData,
		default: null,
	},
});

const accountItems = computed(() =>
	(props?.data?.accountMenu ?? []).map((x) => ({
		label: x.label,
		to: x.to,
		icon: x.icon,
		danger: !!x.danger,
	}))
);
const isOpen = ref(false);
</script>

<template>
	<div class="mobile-header">
		<div class="flex items-center justify-between px-4 h-14">
			<!-- LOGO -->
			<NuxtLink to="/" class="text-black font-light tracking-widest text-lg">
				{{ data?.brand.title ?? "LOGO" }}
			</NuxtLink>

			<!-- RIGHT ACTIONS -->
			<div class="flex items-center gap-3">
				<!-- BALANCE -->
				<UserSetting :data="data" :account-items="accountItems" />

				<!-- MENU BUTTON -->
				<button
					class="h-8 w-8 rounded-full bg-black/15 flex items-center justify-center"
					aria-label="Open menu"
					@click="isOpen = true"
				>
					<Icon name="settings" class="h-5 w-5 text-black" />
				</button>
			</div>
		</div>

		<!-- DRAWER -->
		<UDrawer
			v-model:open="isOpen"
			should-scale-background
			set-background-color-on-scale
			direction="right"
			:ui="{
				content: 'w-[90%] bg-black',
			}"
		>
			<template #content>
				<div class="flex flex-col h-full w-full bg-black text-amber-300">
					<!-- DRAWER HEADER -->
					<div
						class="flex items-center justify-between p-4 border-b border-white/15"
					>
						<span class="text-sm font-semibold tracking-wide"> Menu </span>

						<button
							class="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"
							aria-label="Close menu"
							@click="isOpen = false"
						>
							✕
						</button>
					</div>

					<!-- NAV LINKS -->
					<nav
						class="grid grid-cols-2 gap-3 mt-2 border-b pb-4 border-white/15"
					>
						<!-- <NuxtLink
							v-for="item in data?.topNav"
							:key="item.label"
							:to="item.to"
							class="block rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
							@click="isOpen = false"
						>
							{{ item.label }}
						</NuxtLink> -->
						<span
							v-for="item in data?.topNav"
							:key="item.label"
							class="block rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
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

					<!-- NAVSUB LINKS -->
					<nav class="grid grid-cols-2 gap-3 pt-4 pr-3">
						<span v-for="(item, index) in data?.subNav" :key="index">
							<NuxtLink
								:key="item.label"
								:to="item.to"
								class="block rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
								@click="isOpen = false"
							>
								<Icon :name="item.icon" class="h-4 w-4" />
								{{ item.label }}
							</NuxtLink>
						</span>
					</nav>
				</div>
			</template>
		</UDrawer>
	</div>
</template>

<style scoped>
.mobile-header {
	background-image:
		linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.08)),
		linear-gradient(to right, #e8c56a, #f1d07a, #e6bf5e, #d7ae48);
}
</style>
