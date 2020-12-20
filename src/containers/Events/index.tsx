// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
// components
import EventsList from '_/containers/Events/components/EventsList'
import EventModal from '_/containers/Events/components/EventModal'
import DetailsModal from '_/containers/Events/components/DetailsModal'
// helpers
import { AuthContext, EventsContext } from '_/context'
import { getEvents } from '_/gql/queries'
import { createEvent, createBooking } from '_/gql/mutations'

import { IEvent } from '_/model/event'
import { IEventFormFields } from '_/containers/Events/types'
import { fetchResponseCheck } from '_/utils/helpers'
import useStyles from '_/containers/Events/style'

const Events: React.FC = () => {
  // styles
  const classes = useStyles()
  // context
  const { token, userId } = React.useContext(AuthContext)
  const {
    dispatch,
    state: { eventForm, eventDetails, events, loading },
  } = React.useContext(EventsContext)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const apiUrl = process?.env?.API_URL || ''

  const handleConfirmEventForm = React.useCallback(
    async (
      { date, description, price, title }: IEventFormFields,
      resetForm
    ) => {
      dispatch({ type: 'eventForm', prop: 'loading', payload: true })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(
            createEvent({
              eventInput: {
                title,
                price: +(price as number),
                description,
                date: date?.toISOString() as string,
              },
            })
          ),
          headers,
        })
        if (![200, 201].includes(res?.status)) {
          throw new Error('Failed!')
        }
        resetForm()
        dispatch({ type: 'eventForm', prop: 'isOpen', payload: false })
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
        console.log(err)
      }
      dispatch({ type: 'eventForm', prop: 'loading', payload: false })
    },
    [apiUrl, headers, userId, dispatch]
  )

  const toggleModal = React.useCallback(
    (type: string, prop: string, modalState: boolean) => () => {
      dispatch({ type, prop, payload: modalState })
    },
    [dispatch]
  )

  const handleGetEvents = React.useCallback(async () => {
    dispatch({ type: 'events', prop: 'loading', payload: true })
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getEvents()),
        headers,
      })
      fetchResponseCheck(res?.status)
      const { data } = await res.json()
      dispatch({ type: 'events', prop: 'events', payload: data?.events })
      dispatch({ type: 'eventFormReset' })
    } catch (err) {
      console.log(err)
    }
    dispatch({ type: 'events', prop: 'loading', payload: false })
  }, [apiUrl, headers, dispatch])

  const handleBookEvent = React.useCallback(async () => {
    dispatch({ type: 'eventDetails', prop: 'loading', payload: true })
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(createBooking({ eventId: eventDetails.id })),
        headers,
      })
      fetchResponseCheck(res?.status)
      const { data } = await res.json()
      if (data) {
        dispatch({ type: 'eventDetails', prop: 'isOpen', payload: false })
      }
    } catch (err) {
      console.log(err)
    }
    dispatch({ type: 'eventDetails', prop: 'loading', payload: false })
  }, [apiUrl, headers, eventDetails, dispatch])

  const handleOpenDetails = React.useCallback(
    (id: string) => {
      dispatch({ type: 'eventDetails', prop: 'id', payload: id })
      dispatch({ type: 'eventDetails', prop: 'isOpen', payload: true })
    },
    [dispatch]
  )

  const eventDetailsData = React.useMemo(
    () => events?.find((el: IEvent) => el._id === eventDetails.id),
    [events, eventDetails]
  )

  React.useEffect(() => {
    // fixme if no events fetch it
    handleGetEvents()
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container>
      {loading ? (
        <Grid container justify="center" className={classes.loadingIndicator}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <EventModal
            eventFormData={eventForm}
            onSubmit={handleConfirmEventForm}
            dispatch={dispatch}
            handleClose={toggleModal('eventForm', 'isOpen', false)}
          />
          <DetailsModal
            isOpen={eventDetails?.isOpen}
            loading={eventDetails?.loading}
            handleClose={toggleModal('eventDetails', 'isOpen', false)}
            eventDetailsData={eventDetailsData}
            onSubmit={handleBookEvent}
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
    </Grid>
  )
}

export default Events
