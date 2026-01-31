<script lang="ts" setup>
import Icon from "@/components/header/Icon.vue";
import type { IHeaderData } from "@/models/IHeader";

const props = defineProps({
	data: {
		type: Object as () => IHeaderData,
		default: () => ({}) as IHeaderData,
	},
	accountItems: {
		type: Array as () => Array<{
			label: string;
			icon: string;
			to: string;
			danger?: boolean | undefined;
		}>,
		default: () => [],
	},
});

const selectedValue = ref<string | number | null>(null);
const { state } = useStore();

const liveItems = computed(() =>
	(props.data?.liveCategories ?? []).map((x) => ({
		emoji: x.emoji,
		label: x.label,
		to: x.to,
		icon: x.icon,
		value: x.value,
	}))
);
const dialogOpen = ref(false);
const authDialogRef = useTemplateRef("authDialog");
</script>
<template>
	<div>
		<div v-if="state.isAuth" class="flex flex-col gap-1">
			<div class="hidden md:block text-center">
				<div class="text-[11px] leading-4 text-black">
					Xin chào,
					<span class="font-semibold">{{ data?.user.name }}</span>
				</div>
			</div>
			<div class="flex items-center gap-1 bg-zinc-800 rounded-4xl px-1.5">
				<!-- balance capsule -->
				<SelectDropdown
					v-model="selectedValue"
					:items="liveItems"
					width="180px"
				>
					<div
						class="flex items-center gap-2 rounded-full bg-white px-2 py-2 ring-1 ring-black/10 cursor-pointer"
					>
						<span class="text-[12px] font-semibold text-black/80">🪙</span>
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
					class="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/75"
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
					class="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/75"
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
					align="center"
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
			</div>
		</div>
		<div v-else class="flex gap-1">
			<UButton
				variant="solid"
				class="bg-white text-black shadow cursor-pointer rounded-full px-3 py-2 text-xs md:px-6 md:py-1.5 md:text-base hover:bg-white/90"
				@click="authDialogRef?.openRegister()"
			>
				ĐĂNG KÝ
			</UButton>

			<UButton
				variant="solid"
				class="bg-black text-white shadow cursor-pointer rounded-full px-3 py-2 text-xs md:px-4 md:py-1.5 md:text-base hover:bg-black/90"
				@click="authDialogRef?.openLogin()"
			>
				ĐĂNG NHẬP
			</UButton>
		</div>
		<AuthDialog ref="authDialog" v-model="dialogOpen" />
	</div>
</template>

<style scoped>
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
