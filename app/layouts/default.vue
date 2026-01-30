<script setup lang="ts"></script>

<template>
	<UApp>
		<header class="sticky top-0 z-50 w-full">
			<DesktopAppHeader />
		</header>
		<UMain>
			<slot />
		</UMain>
		<UFooter />
	</UApp>
</template>
