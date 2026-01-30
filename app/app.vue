<script lang="ts" setup>
import { screenMode } from "@/hooks/useScreenMode";
const layoutName = computed(() =>
	screenMode.value === "phone" ? "mobile" : "default"
);
</script>
<template>
	<Suspense>
		<NuxtLayout :name="layoutName">
			<NuxtErrorBoundary />
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
		<!-- loading state -->
		<template #fallback> Loading... </template>
	</Suspense>
</template>
<style lang="scss"></style>
