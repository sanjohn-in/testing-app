<script setup lang="ts">
import type { IHeaderData } from '~/models/IHeader';

const { data } = await useFetch<IHeaderData>("/api/header", {
	server: true,
});
</script>

<template>
	<UApp>
		<!-- Sticky mobile header -->
		<header class="sticky top-0 z-50">
			<MobileHeader :data="data"/>
		</header>

		<!-- Main content -->
		<main class="pb-[72px]">
			<slot />
		</main>

		<!-- Bottom navigation -->
		<!-- <footer class="fixed bottom-0 left-0 right-0 z-50">
			<MobileBottomNav :data="data"/>
		</footer> -->
	</UApp>
</template>
