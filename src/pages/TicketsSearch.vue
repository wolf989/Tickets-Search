<template>
  <div class="tickets-search">
    <AppHeader />

    <div class="tickets-search__container container">
      <FiltersSidebar
        :filters="state.filters"
        @update:model-value="setFilters"
      />

      <main class="tickets-search__main">
        <SortButtons
          v-model="sortBy"
          class="tickets-search__sort"
        />

        <TicketsList
          :tickets="state.tickets"
          :display-tickets="displayTickets"
          :has-more-tickets-to-display="hasMoreTicketsToDisplay"
          :is-loading="state.isLoading"
          :is-initial-loading="isInitialLoading"
          :error="state.error"
          @retry="startSearch"
          @load-more="loadMoreTickets"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import FiltersSidebar from '@/components/FiltersSidebar.vue'
import SortButtons from '@/components/SortButtons.vue'
import TicketsList from '@/components/TicketsList.vue'
import { useTicketsSearch } from '@/composables/useTicketsSearch'

const {
  state,
  displayTickets,
  hasMoreTicketsToDisplay,
  isInitialLoading,
  startSearch,
  loadMoreTickets,
  setFilters,
  setSortBy,
} = useTicketsSearch()

const sortBy = computed({
  get: () => state.value.sortBy,
  set: value => setSortBy(value),
})

onMounted(() => {
  startSearch()
})
</script>

<style scoped lang="scss">
.tickets-search {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 0;
    @media (min-width: 768px) {
      flex-direction: row;
      gap: 20px;
      align-items: flex-start;
    }
	}
	&__main {
		flex: 1;
	}
	&__sort {
		margin-bottom: 20px;
  }
}
</style>
