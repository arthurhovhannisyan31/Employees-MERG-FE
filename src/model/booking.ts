// model
import { IEvent } from '_/model/event'
import { IUser } from '_/model/auth'

export interface IBooking {
  _id: string
  createdAt: string
  updatedAt: string
  event: IEvent
  user: IUser
}

export interface IBookingID {
  bookingId: string
}

export interface IBookEventInput {
  eventId: string
}

export interface ICancelBookingInput {
  bookingId: string
}
