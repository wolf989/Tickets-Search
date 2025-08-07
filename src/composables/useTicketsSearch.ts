import type { FilterState, FlightSearchState, SortOption } from '@/types'
import { computed, ref } from 'vue'
import { fetchTicketsBatch, initializeSearch } from '@/services/api'
import { filterByStops, sortTickets } from '@/utils/ticketHelpers'

const POLLING_CONFIG = {
  delay: 1000,
  backoffMultiplier: 1.5,
} as const

export function useTicketsSearch() {
  const state = ref<FlightSearchState>({
    searchId: null,
    tickets: [],
    filteredTickets: [],
    isLoading: false,
    isCompleted: false,
    error: null,
    filters: {
      stops: ['all'],
    },
    sortBy: 'cheapest',
  })

  const displayedCount = ref(5)

  const filteredAndSortedTickets = computed(() => {
    const filteredByStops = filterByStops(state.value.tickets, state.value.filters.stops)
    return sortTickets(filteredByStops, state.value.sortBy)
  })
  const displayTickets = computed(() => filteredAndSortedTickets.value.slice(0, displayedCount.value))
  const hasMoreTicketsToDisplay = computed(() => displayedCount.value < filteredAndSortedTickets.value.length)
  const isInitialLoading = computed(() => state.value.isLoading && !state.value.tickets.length)

  async function startSearch(): Promise<void> {
    try {
      resetState()
      state.value.isLoading = true

      const searchId = await initializeSearch()
      state.value.searchId = searchId
      await pollTickets(searchId)
    }
    catch (error) {
      handleError(error as Error)
    }
    finally {
      state.value.isLoading = false
    }
  }

  async function pollTickets(searchId: string, attempts: number = 0): Promise<void> {
    if (state.value.isCompleted)
      return

    try {
      const response = await fetchTicketsBatch(searchId)

      if (response.tickets.length)
        state.value.tickets.push(...response.tickets)

      if (response.stop) {
        state.value.isCompleted = true
        return
      }

      await sleep(POLLING_CONFIG.delay)
      await pollTickets(searchId, 0)
    }
    catch (error) {
      console.warn(`Polling attempt ${attempts + 1} failed:`, error)

      const delay = POLLING_CONFIG.delay * POLLING_CONFIG.backoffMultiplier ** Math.min(attempts, 5)
      await sleep(delay)
      await pollTickets(searchId, attempts + 1)
    }
  }

  function loadMoreTickets(): void {
    if (!hasMoreTicketsToDisplay.value)
      return

    const increment = Math.min(5, filteredAndSortedTickets.value.length - displayedCount.value)
    displayedCount.value += increment
  }

  function setFilters(newFilters: Partial<FilterState>): void {
    state.value.filters = { ...state.value.filters, ...newFilters }
  }

  function setSortBy(sortBy: SortOption): void {
    state.value.sortBy = sortBy
  }

  function resetState(): void {
    state.value.searchId = null
    state.value.tickets = []
    state.value.isCompleted = false
    state.value.error = null
    displayedCount.value = 5
  }

  function handleError(error: Error): void {
    state.value.error = `Unexpected error: ${error.message}`
    console.error('Search error:', error)
  }

  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  return {
    state: computed(() => state.value),
    displayTickets,
    filteredAndSortedTickets,
    hasMoreTicketsToDisplay,
    isInitialLoading,
    startSearch,
    loadMoreTickets,
    setFilters,
    setSortBy,
  }
}
