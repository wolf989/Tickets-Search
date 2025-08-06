<template>
  <button
    :disabled="loading"
    type="button"
    class="base-button"
    :class="{
      'base-button--filled': filled,
      'base-button--loading': loading,
      'base-button--not-allowed': notAllowed,
    }"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="base-button__loading-spinner"
    />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  filled?: boolean
  loading?: boolean
  notAllowed?: boolean
}
interface Emits {
  (e: 'click'): void
}

withDefaults(defineProps<Props>(), {
  filled: false,
  loading: false,
  notAllowed: false,
})
const emit = defineEmits<Emits>()

function handleClick(): void {
  emit('click')
}
</script>

<style scoped lang="scss">
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background: var(--neutral-color);
  border: 1px solid #dfe5ec;
	border-radius: 5px;
  color: var(--primary-text-color);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-lg);
  text-transform: uppercase;
  transition: var(--transition-base);
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: #f5f5f5;
    }
  }
  @media (min-width: 768px) {
    padding: 14px;
    font-size: var(--font-size-base);
    line-height: var(--line-height-lg);
  }
  &:focus {
    outline: none;
  }
	&--filled {
		background-color: var(--brand-color);
		color: var(--neutral-color);
		border-color: var(--brand-color);
    @media (hover: hover) {
      &:hover {
        background-color: var(--brand-color);
        opacity: 0.9;
      }
    }
	}
  &--loading {
    opacity: 0.6;
    cursor: not-allowed;
    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
      }
    }
  }
  &--not-allowed {
    cursor: auto;
    @media (hover: hover) {
      &:hover {
        opacity: 1;
      }
    }
  }
  &__loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: var(--spinner-animation);
  }
}
</style>
