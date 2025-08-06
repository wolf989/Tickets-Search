<template>
  <div class="flight-segment">
    <div
      v-for="(data, index) in segmentData"
      :key="index"
      class="flight-segment__block segment-info"
    >
      <p class="segment-info__title">
        {{ data.title }}
      </p>
      <p class="segment-info__subtitle">
        {{ data.subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Segment } from '@/types'
import { computed } from 'vue'
import { timeHumanize } from '@/utils/timeHumanize'

interface Props {
  segment: Segment
}

const props = defineProps<Props>()

const LOCALE = 'uk-UA'
const TIME_FORMAT_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
} as const
const MILLISECONDS_PER_MINUTE = 60 * 1000

const departureDate = computed((): Date => new Date(props.segment.date))
const arrivalDate = computed((): Date => new Date(departureDate.value.getTime() + props.segment.duration * MILLISECONDS_PER_MINUTE))
const formattedDepartureTime = computed((): string => departureDate.value.toLocaleTimeString(LOCALE, TIME_FORMAT_OPTIONS))
const formattedArrivalTime = computed((): string => arrivalDate.value.toLocaleTimeString(LOCALE, TIME_FORMAT_OPTIONS))
const formattedDuration = computed((): string => timeHumanize(props.segment.duration))
const stopsLabel = computed((): string => {
  const count = props.segment.stops.length
  if (count === 0)
    return 'Без пересадок'
  if (count === 1)
    return '1 пересадка'
  if (count < 5)
    return `${count} пересадки`
  return `${count} пересадок`
})
const stopsText = computed((): string => props.segment.stops.length ? props.segment.stops.join(', ') : '')
const segmentData = computed(() => [
  {
    title: `${props.segment.origin} – ${props.segment.destination}`,
    subtitle: `${formattedDepartureTime.value} – ${formattedArrivalTime.value}`,
  },
  {
    title: 'Тривалість',
    subtitle: formattedDuration.value,
  },
  {
    title: stopsLabel.value,
    subtitle: stopsText.value,
  },
])
</script>

<style scoped lang="scss">
.flight-segment {
  display: flex;
  gap: 20px;
}
.segment-info {
  display: flex;
  flex-direction: column;
  width: 140px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  &__title {
    letter-spacing: var(--letter-spacing-lg);
    color: #a0b0b9;
  }
  &__subtitle {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    @media (min-width: 768px) {
      font-size: var(--font-size-lg);
      line-height: var(--line-height-xl);
    }
  }
}
</style>
