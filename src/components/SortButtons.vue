<template>
  <div class="sort-buttons">
    <BaseButton
      v-for="(option, index) in sortOptions"
      :key="option.value"
      :label="option.label"
      :filled="modelValue === option.value"
      :not-allowed="modelValue === option.value"
      class="sort-buttons__button"
      :class="{
        'sort-buttons__button--first': index === 0,
        'sort-buttons__button--last': index === sortOptions.length - 1,
      }"
      @click="handleSortChange(option.value)"
    />
  </div>
</template>

<script setup lang="ts">
import type { SortOption } from '@/types'
import BaseButton from '@/components/base/BaseButton.vue'

interface Props {
  modelValue: SortOption
}
interface Emits {
  (e: 'update:modelValue', value: SortOption): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const sortOptions = [
  { value: 'cheapest' as const, label: 'Найдешевший' },
  { value: 'fastest' as const, label: 'Найшвидший' },
  { value: 'optimal' as const, label: 'Оптимальний' },
]

function handleSortChange(value: SortOption): void {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.sort-buttons {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
	&__button {
		flex: 1;
		border-radius: 0;
		&:not(:first-child) {
      border-top-width: 0.5px;
      @media (min-width: 768px) {
        border-top-width: 1px;
        border-left-width: 0.5px;
      }
    }
		&:not(:last-child) {
      border-bottom-width: 0.5px;
      @media (min-width: 768px) {
        border-bottom-width: 1px;
        border-right-width: 0.5px;
      }
    }
		&--first {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      @media (min-width: 768px) {
        border-top-right-radius: 0;
        border-bottom-left-radius: 5px;
      }
    }
    &--last {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      @media (min-width: 768px) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
	}
}
</style>
