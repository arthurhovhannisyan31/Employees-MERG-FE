// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
// components
import EventsList from '_/pages/Events/components/EventsList'
import EventModal from '_/pages/Events/components/EventModal'
import DetailsModal from '_/pages/Events/components/DetailsModal'
// helpers
import { AuthContext, EventsContext } from '_/context'
import { createEvent, createBooking } from '_/gql/mutations'
import { getEvents } from '_/gql/queries'
import { IEvent } from '_/types'
import useStyles from '_/pages/Events/style'
import { IEventForm } from '_/pages/Events/types'

const Events: React.FC = () => {
  // useStyles
  const classes = useStyles()
  // useContext
  const { token, userId } = React.useContext(AuthContext)
  const {
    dispatch,
    state: { eventForm, eventDetails, events, loading },
  } = React.useContext(EventsContext)

  console.log(eventForm)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const apiUrl = process?.env?.API_URL || ''

  // // todo accept props
  const handleConfirmEventForm = React.useCallback(
    async (values: Partial<IEventForm>) => {
      dispatch({ type: 'eventForm', prop: 'loading', payload: true })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(
            createEvent({
              eventInput: {
                title: eventForm?.fields?.title,
                price: +(eventForm?.fields?.price as number),
                description: eventForm?.fields?.description,
                date: eventForm?.fields?.date?.toISOString() as string,
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
      }
    },
    [apiUrl, eventForm, headers, userId, dispatch]
  )

  const toggleModal = React.useCallback(
    (type: string, prop: string, modalState: boolean) => () => {
      dispatch({ type, prop, payload: modalState })
    },
    [dispatch]
  )

  const handleGetEvents = React.useCallback(async () => {
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
  }, [apiUrl, headers, dispatch])

  // const handleBookEvent = React.useCallback(async () => {
  //   try {
  //     const res = await fetch(apiUrl, {
  //       method: 'POST',
  //       body: JSON.stringify(createBooking({ eventId: eventDetails.id })),
  //       headers,
  //     })
  //     if (![200, 201].includes(res?.status)) {
  //       throw new Error('Failed!')
  //     }
  //     const { data } = await res.json()
  //     if (data) {
  //       dispatch({ type: 'eventDetails', prop: 'isOpen', payload: false })
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [apiUrl, headers, eventDetails.id, dispatch])

  const handleOpenDetails = React.useCallback(
    (id: string) => {
      dispatch({ type: 'eventDetails', prop: 'id', payload: id })
      dispatch({ type: 'eventDetails', prop: 'isOpen', payload: true })
    },
    [dispatch]
  )

  // const eventDetailsData = React.useMemo(
  //   () => events?.find((el: IEvent) => el._id === eventDetails.id),
  //   [events, eventDetails]
  // )

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
            // onSubmit={handleConfirmEventForm}
            dispatch={dispatch}
            handleClose={toggleModal('eventForm', 'isOpen', false)}
          />
          {/* <DetailsModal */}
          {/*  eventDetailsData={eventDetailsData} */}
          {/*  handleConfirm={handleBookEvent} */}
          {/*  isOpen={eventDetails?.isOpen} */}
          {/*  dispatch={dispatch} */}
          {/*  handleClose={toggleModal('eventDetails', 'isOpen', false)} */}
          {/* /> */}
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
