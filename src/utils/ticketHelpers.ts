import type { SortOption, Ticket } from '@/types'

export function getTotalDuration(ticket: Ticket): number {
  return ticket.segments[0].duration + ticket.segments[1].duration
}

export function getMaxStops(ticket: Ticket): number {
  return Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length)
}

export function sortTickets(tickets: Ticket[], sortBy: SortOption): Ticket[] {
  return [...tickets].sort((a, b) => {
    switch (sortBy) {
      case 'cheapest':
        return a.price - b.price
      case 'fastest':
        return getTotalDuration(a) - getTotalDuration(b)
      case 'optimal': {
        const aScore = (a.price / 1000) + (getTotalDuration(a) / 60)
        const bScore = (b.price / 1000) + (getTotalDuration(b) / 60)
        return aScore - bScore
      }
      default:
        return 0
    }
  })
}

export function filterByStops(tickets: Ticket[], allowedStops: number[] | ['all']): Ticket[] {
  if (Array.isArray(allowedStops) && allowedStops[0] === 'all')
    return tickets

  return tickets.filter((ticket) => {
    const maxStops = getMaxStops(ticket)
    return (allowedStops as number[]).includes(maxStops)
  })
}
