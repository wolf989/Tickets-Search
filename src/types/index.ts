export interface Segment {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export interface Ticket {
  price: number
  carrier: string
  segments: [Segment, Segment]
}

export interface SearchResponse {
  searchId: string
}

export interface TicketsResponse {
  tickets: Ticket[]
  stop: boolean
}

export type FilterOptionValue = string | number

export interface FilterState {
  stops: number[] | ['all']
  [key: string]: any
}

export type SortOption = 'cheapest' | 'fastest' | 'optimal'

export interface FlightSearchState {
  searchId: string | null
  tickets: Ticket[]
  filteredTickets: Ticket[]
  isLoading: boolean
  isCompleted: boolean
  error: string | null
  filters: FilterState
  sortBy: SortOption
}
