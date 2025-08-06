<template>
  <header class="app-header">
    <div class="app-header__container container">
      <div class="app-header__logo">
        <img src="@/assets/images/logo.svg" alt="Logo">
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
	padding: 39px 0;
	&__container {
		display: flex;
		justify-content: center;
	}
	&__logo {
		width: 82px;
		height: 89px;
		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
