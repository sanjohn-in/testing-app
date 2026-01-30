<script setup lang="ts">
definePageMeta({
	layout: "default",
});
</script>

<template>
	<UApp>
		<header class="sticky top-0 z-50 w-full">
			<AppHeader />
		</header>
		<UMain>
			<slot />
		</UMain>
		<UFooter />
	</UApp>
</template>
