<template>
  <label class="base-checkbox">
    <input
      :id="id"
      v-model="model"
      :value="value"
      type="checkbox"
      class="base-checkbox__input"
      :class="{
        'base-checkbox__input--checked': isChecked,
      }"
    >
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  id: string
  value: any
  label: string
}

const props = defineProps<Props>()

const model = defineModel()

const isChecked = computed(() => {
  if (!model.value)
    return false

  return Array.isArray(model.value)
    ? model.value.includes(props.value)
    : model.value === props.value
})
</script>

<style scoped lang="scss">
.base-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 12px;
	line-height: var(--line-height-base);
  transition: var(--transition-base);
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: #f1fcff
    }
  }
  @media (min-width: 768px) {
    font-size: 13px;
	  line-height: var(--line-height-lg);
  }
	&__input {
    appearance: none;
    position: relative;
    user-select: none;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    vertical-align: middle;
    border: 1px solid #9abbce;
    border-radius: 2px;
    cursor: pointer;
    @media (min-width: 768px) {
      width: 20px;
      height: 20px;
    }
    &--checked {
      border-color: var(--brand-color);
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 8px;
        background-image: url('@/assets/images/checkmark-icon.svg');
        background-size: cover;
      }
    }
	}
}
</style>
