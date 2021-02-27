// deps
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
// local
// components
import TabPanel from '_/containers/Bookings/components/TabPanel'
import BookingList from '_/containers/Bookings/components/BookingList'
// helpers
import { IBookingAction, IBookingsState } from '_/containers/Bookings/types'
// @ts-ignore
import { IBooking } from '_/types'
// @ts-ignore
import { getBookings } from '_/gql/queries'
// @ts-ignore
import { cancelBooking } from '_/gql/mutations'
import { AuthContext } from '_/context'
import { a11yProps } from '_/containers/Bookings/helpers'

const bookingsInitState: IBookingsState = {
  bookings: [],
  loading: false,
  tab: 0,
}

const bookingsReducer = (state: IBookingsState, action: IBookingAction) => {
  const {
    type,
    // prop,
    payload,
  } = action
  switch (type) {
    case 'loading':
      return {
        ...state,
        loading: payload,
      }
    case 'bookings':
      return {
        ...state,
        bookings: payload,
      }
    case 'tab':
      return {
        ...state,
        tab: payload,
      }
    default:
      return state
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  loadingIndicator: {
    padding: theme.spacing(5),
  },
}))

const Bookings: React.FC = () => {
  // useContext
  const { token } = React.useContext(AuthContext)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const apiUrl = process?.env?.API_URL || ''

  // useReducer
  const [state, dispatch] = React.useReducer(bookingsReducer, bookingsInitState)

  const { bookings, loading, tab } = state

  // useStyles
  const classes = useStyles()

  const handleChangeTab = React.useCallback(
    (_: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
      dispatch({ type: 'tab', payload: newValue })
    },
    [],
  )

  const handleGetBookings = React.useCallback(async () => {
    try {
      dispatch({ type: 'loading', payload: true })
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getBookings()),
        headers,
      })
      if (![200, 201].includes(res?.status)) {
        throw new Error('Failed!')
      }
      const { data } = await res.json()
      dispatch({ type: 'loading', payload: false })
      dispatch({ type: 'bookings', payload: data?.bookings })
    } catch (err) {
      console.log(err)
    }
  }, [headers, apiUrl])

  const handleDeleteBooking = React.useCallback(
    async (bookingId: string) => {
      try {
        dispatch({ type: 'loading', payload: true })
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(cancelBooking({ bookingId })),
          headers,
        })
        if (![200, 201].includes(res?.status)) {
          throw new Error('Failed!')
        }
        const newBookings = bookings.filter(
          (el: IBooking) => el._id !== bookingId,
        )
        dispatch({ type: 'bookings', payload: newBookings })
        dispatch({ type: 'loading', payload: false })
      } catch (err) {
        console.log(err)
      }
    },
    [headers, apiUrl, bookings],
  )

  React.useEffect(() => {
    handleGetBookings()
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container item className={classes.container} direction="column">
      <Grid item>
        {loading ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          <>
            <AppBar position="static">
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
              >
                <Tab label="Booking List" {...a11yProps(0)} />
                <Tab label="Booking Charts" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
              <BookingList bookings={bookings} onDelete={handleDeleteBooking} />
            </TabPanel>
            <TabPanel value={tab} index={1} />
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Bookings
