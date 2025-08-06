<template>
  <aside class="filters-sidebar">
    <BaseCard
      v-for="filter in filtersModel"
      :key="filter.id"
      class="filters-sidebar__section filters-section"
    >
      <h3 class="filters-section__title">
        {{ filter.label }}
      </h3>
      <div class="filters-section__options">
        <BaseCheckbox
          v-for="option in filter.options"
          :id="option.id"
          :key="option.id"
          :model-value="selectedFilters[filter.id]"
          :value="option.value"
          :label="option.label"
          @update:model-value="handleFilterChange(filter.id, option.value)"
        />
      </div>
    </BaseCard>
  </aside>
</template>

<script setup lang="ts">
import type { Props as BaseCheckboxProps } from '@/components/base/BaseCheckbox.vue'
import type { FilterOptionValue, FilterState } from '@/types'
import { reactive } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'

interface FilterOption extends BaseCheckboxProps {
  value: FilterOptionValue
}
interface Filter {
  id: string
  label: string
  options: FilterOption[]
}
interface Props {
  filters: FilterState
}
interface Emits {
  (e: 'update:modelValue', filters: FilterState): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const filtersModel: Filter[] = [
  {
    id: 'stops',
    label: 'Кількість пересадок',
    options: [
      { id: 'all', label: 'Всі', value: 'all' },
      { id: '0', label: 'Без пересадок', value: 0 },
      { id: '1', label: '1 пересадка', value: 1 },
      { id: '2', label: '2 пересадки', value: 2 },
      { id: '3', label: '3 пересадки', value: 3 },
    ],
  },
]

const selectedFilters = reactive<Record<string, FilterOptionValue[]>>({ ...props.filters })

function handleFilterChange(filterId: string, value: FilterOptionValue): void {
  const current = selectedFilters[filterId] || []
  const filter = filtersModel.find(f => f.id === filterId)!
  const nonAllOptions = filter.options.filter(opt => opt.value !== 'all').map(opt => opt.value)

  if (value === 'all') {
    if (nonAllOptions.every(opt => current.includes(opt)))
      return

    if (current.length === 1 && current.includes('all'))
      return

    selectedFilters[filterId] = [...nonAllOptions]
  }
  else {
    let newSelected = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current.filter(v => v !== 'all'), value]

    if (newSelected.length === 0)
      newSelected = ['all']

    selectedFilters[filterId] = newSelected
  }

  const filterState: FilterState = {
    stops: [],
  }

  filtersModel.forEach((filter) => {
    if (selectedFilters[filter.id]) {
      const values = selectedFilters[filter.id]
      if (values.length > 0)
        filterState[filter.id as keyof FilterState] = values as any
    }
  })

  emit('update:modelValue', filterState)
}
</script>

<style scoped lang="scss">
.filters-sidebar {
  width: 100%;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    max-width: 232px;
    margin-bottom: 0;
  }
}
.filters-section {
	padding: 20px 0 10px;
	&__title {
		padding: 0 20px;
		margin-bottom: 10px;
		font-size: var(--font-size-base);
		line-height: 12px;
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-lg);
	}
}
</style>
