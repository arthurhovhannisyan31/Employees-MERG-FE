// deps
import React from 'react'
// model
import {
  IEventForm,
  IEventFormAction,
  IEventsState,
} from '_/containers/Events/types'
import { IEventsContext } from '_/model/context/events'

const eventFormInitState: IEventForm = {
  isOpen: false,
  loading: false,
  fields: {
    title: '',
    description: '',
    price: null,
    date: null,
  },
}

const eventsInitState: IEventsState = {
  eventForm: eventFormInitState,
  eventDetails: {
    id: '',
    isOpen: false,
    loading: false,
  },
  events: [],
  loading: false,
}

const contextInitState = {
  state: eventsInitState,
  initState: eventsInitState,
  dispatch: () => {},
}

const EventsContext = React.createContext<IEventsContext>(contextInitState)

const eventsReducer = (state: IEventsState, action: IEventFormAction) => {
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
    case 'events':
      return { ...state, [prop as string]: payload }
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
