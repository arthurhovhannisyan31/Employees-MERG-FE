// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
// local
import EventsList from '_/pages/Events/components/EventsList'
import EventModal from '_/pages/Events/components/EventModal'
import DetailsModal from '_/pages/Events/components/DetailsModal'
import {
  IEventsState,
  IEventFormAction,
  IEventForm,
} from '_/pages/Events/types'
import { AuthContext } from '_/context'
import { createEvent, createBooking } from '_/gql/mutations'
import { getEvents } from '_/gql/queries'
import { IEvent } from '_/types'

const eventFormInitState: IEventForm = {
  isOpen: false,
  title: '',
  description: '',
  price: null,
  date: null,
  loading: false,
}

const eventsInitState: IEventsState = {
  eventForm: eventFormInitState,
  eventDetails: {
    id: '',
    isOpen: false,
  },
  events: [],
  loading: false,
  active: false,
}

const eventsReducer = (state: IEventsState, action: IEventFormAction) => {
  const { type, prop, payload } = action
  switch (type) {
    case 'eventForm':
      return {
        ...state,
        eventForm: { ...state.eventForm, [prop as string]: payload },
      }
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
    case 'resetForm':
      return { ...state, eventForm: eventFormInitState }
    default:
      return state
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: theme.spacing(1),
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  loadingIndicator: {
    padding: theme.spacing(5),
  },
}))

const Events: React.FC = () => {
  // useContext
  const { token, userId } = React.useContext(AuthContext)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const apiUrl = process?.env?.API_URL || ''

  // useReducer
  const [state, dispatch] = React.useReducer(eventsReducer, eventsInitState)

  const { eventForm, eventDetails, events, loading } = state
  console.log(eventForm)

  // useStyles
  const classes = useStyles()

  const handleConfirmEventForm = async () => {
    dispatch({ type: 'eventForm', prop: 'loading', payload: true })
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(
          createEvent({
            eventInput: {
              title: eventForm?.title,
              price: +(eventForm?.price as number),
              description: eventForm?.description,
              date: eventForm?.date?.toISOString() as string,
            },
          })
        ),
        headers,
      })
      if (![200, 201].includes(res?.status)) {
        throw new Error('Failed!')
      }
      dispatch({ type: 'eventForm', prop: 'isOpen', payload: false })
      dispatch({ type: 'eventForm', prop: 'loading', payload: false })
      const {
        data: { createEvent: createdEventData },
      } = await res.json()
      dispatch({
        type: 'addEvent',
        payload: {
          ...createdEventData,
          creator: {
            ...createdEventData.creator,
            _id: userId,
          },
        },
      })
      dispatch({ type: 'resetForm' })
    } catch (err) {
      dispatch({ type: 'loading', payload: false })
      console.log(err)
    }
  }

  const toggleModal = (
    type: string,
    prop: string,
    modalState: boolean
  ) => () => {
    dispatch({ type, prop, payload: modalState })
  }

  const handleGetEvents = async () => {
    try {
      dispatch({ type: 'loading', payload: true })
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getEvents()),
        headers,
      })
      if (![200, 201].includes(res?.status)) {
        throw new Error('Failed!')
      }
      const { data } = await res.json()
      dispatch({ type: 'events', payload: data?.events })
      dispatch({ type: 'resetForm' })
      dispatch({ type: 'loading', payload: false })
    } catch (err) {
      console.log(err)
    }
  }

  const handleBookEvent = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(createBooking({ eventId: eventDetails.id })),
        headers,
      })
      if (![200, 201].includes(res?.status)) {
        throw new Error('Failed!')
      }
      const { data } = await res.json()
      if (data) {
        dispatch({ type: 'eventDetails', prop: 'isOpen', payload: false })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenDetails = (id: string) => {
    dispatch({ type: 'eventDetails', prop: 'id', payload: id })
    dispatch({ type: 'eventDetails', prop: 'isOpen', payload: true })
  }

  const eventDetailsData = events?.find(
    (el: IEvent) => el._id === eventDetails.id
  )

  React.useEffect(() => {
    handleGetEvents()
    // todo review setState on unmount
    // dispatch({type: "active", payload: true})
    // return () => dispatch({type: 'active', payload: false})
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {loading ? (
        <Grid container justify="center" className={classes.loadingIndicator}>
          <CircularProgress size={20} />
        </Grid>
      ) : (
        <>
          <EventModal
            eventFormData={eventForm}
            handleConfirm={handleConfirmEventForm}
            dispatch={dispatch}
            handleClose={toggleModal('eventForm', 'isOpen', false)}
          />
          <DetailsModal
            eventDetailsData={eventDetailsData}
            handleConfirm={handleBookEvent}
            isOpen={eventDetails?.isOpen}
            dispatch={dispatch}
            handleClose={toggleModal('eventDetails', 'isOpen', false)}
          />
          <Grid container item className={classes.container} direction="column">
            {token && (
              <Grid item>
                <Button onClick={toggleModal('eventForm', 'isOpen', true)}>
                  Add event
                </Button>
              </Grid>
            )}
            <Divider color="primary" className={classes.divider} />
            <Grid item>
              <EventsList
                events={events}
                handleOpenDetails={handleOpenDetails}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Events
