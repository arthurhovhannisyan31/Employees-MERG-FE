import { IEvent } from '_/types'

export interface IEventsState {
  eventForm: IEventForm
  eventDetails: IEventDetails
  events: IEvent[]
  loading: boolean
  // active: boolean
}

export interface IEventFormFields {
  title: string
  description: string
  price: number | null
  date: Date | null
}

export interface IEventForm {
  isOpen: false
  loading: boolean
  fields: IEventFormFields
}

export interface IEventDetails {
  id: string
  isOpen: boolean
  loading: boolean
}

export interface IEventFormAction {
  type: string
  prop?: string
  // eslint-disable-next-line
  payload?: any
}
