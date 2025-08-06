<template>
  <BaseCard class="ticket-card">
    <div class="ticket-card__head">
      <div class="ticket-card__price">
        {{ formattedPrice }}
      </div>
      <AirlineLogo :carrier="ticket.carrier" />
    </div>

    <div>
      <FlightSegment
        v-for="(segment, index) in ticket.segments"
        :key="index"
        :segment="segment"
        class="ticket-card__segment"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Ticket } from '@/types'
import { computed } from 'vue'
import AirlineLogo from '@/components/AirlineLogo.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import FlightSegment from '@/components/FlightSegment.vue'

interface Props {
  ticket: Ticket
}

const props = defineProps<Props>()

const formattedPrice = computed((): string => `${props.ticket.price.toLocaleString('uk-UA')} ₴`)
</script>

<style scoped lang="scss">
.ticket-card {
  transition: var(--transition-base);
  @media (min-width: 768px) {
    padding: 23px 20px 20px 20px;
  }
	&__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 21px;
	}
	&__price {
		font-size: 18px;
		line-height: 18px;
		font-weight: var(--font-weight-bold);
		color: var(--brand-color);
    @media (min-width: 768px) {
      font-size: 24px;
		  line-height: 24px;
    }
	}
	&__segment:not(:last-child) {
		margin-bottom: 10px;
	}
}
</style>
