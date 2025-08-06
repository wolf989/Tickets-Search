<template>
  <BaseCard class="loading-state">
    <div class="loading-state__spinner" />
    <p>{{ message }}</p>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Пошук...',
})
</script>

<style scoped lang="scss">
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 53px 20px;
  &__spinner {
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--brand-color);
    border-radius: 50%;
    animation: var(--spinner-animation);
  }
}
</style>
