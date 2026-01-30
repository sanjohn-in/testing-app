<template>
	<Suspense>
		<NuxtLayout>
			<NuxtErrorBoundary />
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
		<!-- loading state -->
		<template #fallback> Loading... </template>
	</Suspense>
</template>
