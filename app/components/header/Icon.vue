<script setup lang="ts">
import {
	ArrowRightOnRectangleIcon,
	BellIcon,
	BookOpenIcon,
	CalendarIcon,
	ChartBarIcon,
	CheckCircleIcon,
	ChevronDownIcon,
	EnvelopeIcon,
	FilmIcon,
	NewspaperIcon,
	PlayIcon,
	PlusIcon,
	SparklesIcon,
	UserIcon,
	VideoCameraIcon,
	WalletIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps<{ name: string; class?: string }>();

const map: Record<string, object> = {
	newspaper: NewspaperIcon,
	play: PlayIcon,
	film: FilmIcon,
	sparkles: SparklesIcon,
	video: VideoCameraIcon,
	book: BookOpenIcon,

	user: UserIcon,
	check: CheckCircleIcon,
	wallet: WalletIcon,
	chart: ChartBarIcon,
	logout: ArrowRightOnRectangleIcon,

	bell: BellIcon,
	mail: EnvelopeIcon,
	plus: PlusIcon,
	down: ChevronDownIcon,
	calendar: CalendarIcon,
};

const Comp = computed(() => map[props.name] ?? ChevronDownIcon);
</script>

<template>
	<component :is="Comp" :class="props.class" />
</template>
