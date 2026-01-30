<script setup lang="ts">
import Icon from "@/components/header/Icon.vue";

type Item = {
	label: string;
	icon?: string;
	emoji?: string;
	to: string;
	danger?: boolean;
	width?: string;
	align?: 'start' | 'center' | 'end';
};
const props = withDefaults(
	defineProps<{
		items: Item[];
		width?: string;
		align?: 'start' | 'center' | 'end';
	}>(),
	{
		width: "100px",
		align: "end",
	}
);
const open = ref(false);

let closeTimer: ReturnType<typeof setTimeout> | null = null;

function cancelClose() {
	if (closeTimer) {
		clearTimeout(closeTimer);
		closeTimer = null;
	}
}

function openNow() {
	cancelClose();
	open.value = true;
}

function scheduleClose() {
	cancelClose();
	closeTimer = setTimeout(() => {
		open.value = false;
	}, 180);
}

function go(to: string) {
	open.value = false;
	navigateTo(to);
}
</script>

<template>
	<UPopover
		v-model:open="open"
		:content="{ side: 'bottom', align: props.align, sideOffset: 2 }"
		:ui="{
			content: 'p-2 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg ring-0',
		}"
	>
		<!-- Trigger -->
		<template #default>
			<div @mouseenter="openNow" @mouseleave="scheduleClose">
				<slot />
			</div>
		</template>

		<!-- Panel -->
		<template #content>
			<div
				:style="{
					minWidth: props.width,
					// maxWidth: '220px',
				}"
				@mouseenter="openNow"
				@mouseleave="scheduleClose"
			>
				<button
					v-for="it in props.items"
					:key="it.label"
					class="account-row"
					:class="it.danger ? 'text-red-600 hover:text-red-200' : ''"
					@click="go(it.to)"
				>
					<div class="account-row-icon">
						<Icon v-if="it.icon" :name="it.icon" class="h-5 w-5" />
						<span v-else-if="it.emoji" class="h-6 p-0 m-0">{{ it.emoji }}</span>
					</div>
					<div class="account-row-text">{{ it.label }}</div>
				</button>
			</div>
		</template>
	</UPopover>
</template>

<style scoped>
.account-row:focus,
.account-row:focus-visible {
	outline: none;
	box-shadow: none;
}
.account-row {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 8px;
	border-radius: 999px;
	padding: 10px 12px;
	cursor: pointer;
	margin-bottom: 6px;

	color: rgba(0, 0, 0, 0.75);
	background: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0.11),
		rgba(235, 235, 235, 0.151)
	);

	transition:
		background-color 0.15s ease,
		color 0.15s ease,
		box-shadow 0.15s ease;
}

.account-row:hover {
	background: #000;
	color: rgb(252 211 77);
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.35);
	margin-bottom: 6px;
}

.account-row-icon {
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: currentColor;
}

.account-row-text {
	/* flex: 1; */
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.3px;
	text-transform: uppercase;
	align-items: start;
	justify-content: start;
}
</style>
