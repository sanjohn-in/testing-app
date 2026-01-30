<script setup lang="ts">
import Icon from "@/components/header/Icon.vue";
import type { IHeaderData } from "@/models/IHeader";

const props = defineProps({
	data: {
		type: Object as () => IHeaderData,
		default: null,
	},
});
</script>

<template>
	<nav
		class="h-[64px] bg-black text-amber-300 flex items-center justify-around"
	>
		<NuxtLink
			v-for="item in props.data?.subNav"
			:key="item.label"
			:to="item.to"
		>
			<div class="flex justify-around flex-col items-center">
				<Icon :name="item.icon" class="h-4 w-4 text-gold-200" />
				<span class="text-xs">{{ item.label }}</span>
			</div>
		</NuxtLink>
	</nav>
</template>

<style scoped>
.mobile-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	font-size: 11px;
	font-weight: 600;
	opacity: 0.85;
}
.mobile-tab.router-link-active {
	opacity: 1;
	color: #fde68a;
}
</style>
