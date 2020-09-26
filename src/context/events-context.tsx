// deps
import React from 'react'
// helpers
import {
  IEventForm,
  IEventFormAction,
  IEventsState,
} from '_/pages/Events/types'

export const eventFormInitState: IEventForm = {
  isOpen: false,
  loading: false,
  fields: {
    title: '',
    description: '',
    price: null,
    date: null,
  },
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

interface IEventsContext {
  state: IEventsState
  initState: IEventsState
  dispatch: React.Dispatch<IEventFormAction>
}

const contextInitState = {
  state: eventsInitState,
  initState: eventsInitState,
  dispatch: () => {},
}

const EventsContext = React.createContext<IEventsContext>(contextInitState)

export const eventsReducer = (
  state: IEventsState,
  action: IEventFormAction
) => {
  const { type, prop, payload } = action
  switch (type) {
    case 'eventForm':
      return {
        ...state,
        eventForm: { ...state.eventForm, [prop as string]: payload },
      }
    case 'eventFormField':
      return {
        ...state,
        eventForm: {
          ...state.eventForm,
          fields: {
            ...state.eventForm.fields,
            [prop as string]: payload,
          },
        },
      }
    case 'eventFormReset':
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

const EventContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(eventsReducer, eventsInitState)

  return (
    <EventsContext.Provider
      value={{
        state,
        dispatch,
        initState: eventsInitState,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export { EventContextContainer as default, EventsContext }
