<template>
  <div class="tickets-list">
    <template v-if="displayTickets.length">
      <div class="tickets-list__items">
        <TicketCard
          v-for="(ticket, index) in displayTickets"
          :key="`${ticket.carrier}-${ticket.price}-${index}`"
          :ticket="ticket"
        />
      </div>

      <BaseButton
        v-if="shouldShowLoadMoreButton"
        :loading="isLoading"
        :label="loadMoreButtonLabel"
        filled
        @click="handleLoadMore"
      />
    </template>

    <CommonLoadingState v-if="isInitialLoading" />

    <CommonEmptyState v-else-if="showEmptyState" />

    <CommonErrorState
      v-else-if="error && !isLoading"
      :error="error"
      @retry="handleRetry"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from '@/types'
import { computed } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import CommonEmptyState from '@/components/common/CommonEmptyState.vue'
import CommonErrorState from '@/components/common/CommonErrorState.vue'
import CommonLoadingState from '@/components/common/CommonLoadingState.vue'
import TicketCard from '@/components/TicketCard.vue'

interface Props {
  tickets: Ticket[]
  displayTickets: Ticket[]
  hasMoreTicketsToDisplay: boolean
  isLoading: boolean
  isInitialLoading: boolean
  error: string | null
}
interface Emits {
  (e: 'retry'): void
  (e: 'loadMore'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showEmptyState = computed((): boolean =>
  !props.isInitialLoading
  && !props.error
  && !!props.tickets.length
  && !props.displayTickets.length,
)
const shouldShowLoadMoreButton = computed((): boolean => props.hasMoreTicketsToDisplay && !!props.tickets.length && !props.error)
const loadMoreButtonLabel = computed((): string => props.isLoading ? 'Завантажується...' : 'Завантажити ще 5 квитків')

function handleLoadMore(): void {
  emit('loadMore')
}

function handleRetry(): void {
  emit('retry')
}
</script>

<style scoped lang="scss">
.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
	&__items {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
}
</style>
