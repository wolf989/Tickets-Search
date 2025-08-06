<template>
  <BaseCard class="empty-state">
    <div class="empty-state__icon">
      🔍
    </div>
    <p>{{ message }}</p>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Даних не знайдено',
})
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 53px 20px;
  &__icon {
    font-size: 40px;
    line-height: 40px;
    margin-bottom: 20px;
  }
}
</style>
