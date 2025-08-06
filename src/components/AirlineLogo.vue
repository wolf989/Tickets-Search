<template>
  <div class="airline-logo">
    <img
      v-if="!hasError"
      :src="logoUrl"
      :alt="carrier"
      class="airline-logo__image"
      @load="handleImageLoad"
      @error="handleImageError"
    >
    <div v-else>
      {{ carrier }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  carrier: string
}

const props = defineProps<Props>()

const hasError = ref(false)

const logoUrl = computed((): string => `//pics.avs.io/99/36/${props.carrier}.png`)

function handleImageError(): void {
  hasError.value = true
}

function handleImageLoad(): void {
  hasError.value = false
}
</script>

<style scoped lang="scss">
.airline-logo {
  display: flex;
  align-items: center;
  justify-content: center;
	width: 70px;
  height: 32px;
	&__image {
		width: 100%;
		height: 100%;
		object-fit: fill;
		transition: var(--transition-base);
	}
}
</style>
