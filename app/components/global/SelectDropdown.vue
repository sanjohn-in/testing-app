<script setup lang="ts">
import Icon from "@/components/header/Icon.vue";

export type SelectItem = {
	value: string | number;
	label: string;
	icon?: string;
	emoji?: string;
	danger?: boolean;
};

const props = withDefaults(
	defineProps<{
		modelValue: string | number | null;
		items: SelectItem[];

		/** popover min width (same as your old prop) */
		width?: string;

		/** optional: placeholder when nothing selected */
		placeholder?: string;

		/** open on hover (optional, default false for select) */
		hover?: boolean;
	}>(),
	{
		width: "120px",
		placeholder: "Select",
		hover: false,
	}
);

const emit = defineEmits<{
	(e: "update:modelValue" | "change", v: string | number): void;
}>();

const open = ref(false);

// hover timer (optional)
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
	closeTimer = setTimeout(() => (open.value = false), 180);
}

function choose(item: SelectItem) {
	emit("update:modelValue", item.value);
	emit("change", item.value);
	open.value = false;
}
</script>

<template>
	<UPopover
		v-model:open="open"
		:content="{ side: 'bottom', align: 'start', sideOffset: 6 }"
		:ui="{
			content:
				'p-2 bg-zinc-900/10 backdrop-blur-md rounded-2xl shadow-lg ring-0',
		}"
	>
		<!-- Trigger -->
		<template #default>
			<slot />
		</template>

		<!-- Panel -->
		<template #content>
			<div
				class="select-panel"
				:style="{ minWidth: props.width }"
				@mouseenter="props.hover ? openNow : undefined"
				@mouseleave="props.hover ? scheduleClose : undefined"
			>
				<button
					v-for="it in props.items"
					:key="it.value"
					type="button"
					class="account-row"
					:class="[
						it.danger ? 'is-danger' : '',
						it.value === props.modelValue ? 'is-selected' : '',
					]"
					@click="choose(it)"
				>
					<div class="account-row-icon">
						<Icon v-if="it.icon" :name="it.icon" class="h-5 w-5" />
						<span v-if="it.emoji" class="select-emoji">{{ it.emoji }}</span>
					</div>

					<div class="account-row-text">{{ it.label }}</div>

					<!-- selected indicator -->
					<div
						v-if="it.value === props.modelValue"
						class="ml-auto pr-2 text-[12px] opacity-80"
					>
						✓
					</div>
				</button>
			</div>
		</template>
	</UPopover>
</template>

<style scoped>
.select-trigger {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	border-radius: 999px;
	padding: 8px 12px;
	cursor: pointer;
	user-select: none;

	background: rgba(255, 255, 255, 0.85);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
	color: rgba(0, 0, 0, 0.85);
	transition:
		filter 0.15s ease,
		background-color 0.15s ease;
}
.select-trigger:hover {
	filter: brightness(0.98);
}
.select-trigger:focus,
.select-trigger:focus-visible {
	outline: none;
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18);
}

.select-trigger-left {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
}
.select-trigger-label {
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.3px;
	text-transform: uppercase;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.select-trigger-arrow {
	font-size: 12px;
	opacity: 0.9;
}

/* Panel wrapper */
.select-panel {
	padding: 0;
}

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

	color: rgba(255, 255, 255, 0.75);
	background: linear-gradient(
		to bottom,
		rgba(143, 143, 143, 0.067),
		rgba(117, 116, 116, 0.357)
	);

	transition:
		background-color 0.15s ease,
		color 0.15s ease,
		box-shadow 0.15s ease;
}

.account-row:hover,
.account-row.is-selected {
	background: white;
	color: rgb(252 211 77);
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.35);
}

.account-row.is-danger:hover {
	background: #000;
	color: #f87171;
}

.account-row-icon {
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: currentColor;
}

.account-row-text {
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.3px;
	text-transform: uppercase;
}

.select-emoji {
	font-size: 16px;
	line-height: 1;
}
</style>
