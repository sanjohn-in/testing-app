<script lang="ts" setup>
import { screenMode } from "@/hooks/useScreenMode";
const layoutName = computed(() =>
	screenMode.value === "phone" ? "mobile" : "default"
);
const loadingPage = ref();

onBeforeMount(() => {
	loadingPage.value = false;
});

onMounted(() => {
	setTimeout(() => {
		loadingPage.value = true;
	}, 50);
});
</script>
<template>
	<AppLoading v-if="!loadingPage" class="md:hidden flex" />
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
