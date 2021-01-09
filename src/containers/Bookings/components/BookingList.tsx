// deps
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

// local
import { IBooking } from '_/types'
import BookingItem from '_/containers/Bookings/components/BookingItem'

interface IProps {
  bookings: IBooking[]
  onDelete: (val: string) => void
}

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
})

const BookingList: React.FC<IProps> = ({ bookings, onDelete }) => {
  const classes = useStyles()

  const bookingItems = bookings?.map((el) => (
    <Grid item key={el._id}>
      <BookingItem onDelete={onDelete} {...el} />
    </Grid>
  ))

  return (
    <Grid container spacing={3} className={classes.container}>
      {bookingItems}
    </Grid>
  )
}

export default BookingList
