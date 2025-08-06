<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-card {
	background-color: var(--neutral-color);
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
	padding: 12px;
	border-radius: 5px;
	@media (min-width: 768px) {
		padding: 20px;
	}
}
</style>
