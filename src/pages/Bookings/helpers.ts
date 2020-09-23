// eslint-disable-next-line
import { IBooking } from '_/types'

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const handleBookingGroups = (
  items: IBooking[],
  categories: Record<string, number>
) => {
  const ranges = Object.entries(categories).map(([key, val], idx, arr) => {
    const isLast = idx + 1 === arr.length
    return {
      max: isLast ? Infinity : Math.max(val, arr[idx - 1]?.[1] || 0),
      min: Math.min(val, arr[idx - 1]?.[1] || 0),
      label: key,
    }
  })
  return ranges.map((range) => [
    range.label,
    items.filter(
      (el) => el.event.price >= range.min && el.event.price < range.max
    ).length,
  ])
}
