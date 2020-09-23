import { IEvent } from '_/types'

export interface IEventsState {
  eventForm: IEventForm
  eventDetails: IEventDetails
  events: IEvent[]
  loading: boolean
  active: boolean
}

export interface IEventForm {
  isOpen: false
  loading: boolean
  title: string
  description: string
  price: number | null
  date: Date | null
}

export interface IEventDetails {
  id: string
  isOpen: boolean
}

export interface IEventFormAction {
  type: string
  prop?: string
  // eslint-disable-next-line
  payload?: any
}
