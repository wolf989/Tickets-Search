<template>
  <BaseCard class="error-state">
    <div class="error-state__icon">
      ⚠️
    </div>
    <p class="error-state__text">
      {{ error }}
    </p>
    <BaseButton
      filled
      label="Спробувати знову"
      @click="handleRetry"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'

interface Props {
  error?: string
}
interface Emits {
  (e: 'retry'): void
}

withDefaults(defineProps<Props>(), {
  error: 'Сталась помилка. Будь ласка, спробуйте ще раз.',
})
const emit = defineEmits<Emits>()

function handleRetry() {
  emit('retry')
}
</script>

<style scoped lang="scss">
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 53px 20px;
  &__icon {
    font-size: 40px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  &__text {
    color: var(--error-color);
    margin-bottom: 20px;
  }
}
</style>
