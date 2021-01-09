import { IBooking } from '_/types'

export interface IBookingsState {
  loading: boolean
  bookings: IBooking[]
  tab: number
}

export interface IBookingAction {
  type: string
  prop?: string
  // eslint-disable-next-line
  payload?: any
}
