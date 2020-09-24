// helpers
import {
  IEventForm,
  IEventFormAction,
  IEventsState,
} from '_/pages/Events/types'

export const eventFormInitState: IEventForm = {
  isOpen: false,
  title: '',
  description: '',
  price: null,
  date: null,
  loading: false,
}

export const eventsInitState: IEventsState = {
  eventForm: eventFormInitState,
  eventDetails: {
    id: '',
    isOpen: false,
  },
  events: [],
  loading: false,
  active: false,
}

export const eventsReducer = (
  state: IEventsState,
  action: IEventFormAction
) => {
  const { type, prop, payload } = action
  switch (type) {
    case 'eventForm':
      return {
        ...state,
        eventForm: { ...state.eventForm, ...payload },
      }
    case 'eventFormField':
      return {
        ...state,
        eventForm: { ...state.eventForm, [prop as string]: payload },
      }
    case 'resetForm':
      return { ...state, eventForm: eventFormInitState }
    case 'eventDetails':
      return {
        ...state,
        eventDetails: { ...state.eventDetails, [prop as string]: payload },
      }
    case 'loading': {
      return { ...state, loading: payload }
    }
    case 'active': {
      return { ...state, active: payload }
    }
    case 'events':
      return { ...state, [type]: payload }
    case 'addEvent':
      return { ...state, events: [...state.events, payload] }
    default:
      return state
  }
}
