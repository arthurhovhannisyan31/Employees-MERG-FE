// deps
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
// local
import { IBooking } from '_/types'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    padding: theme.spacing(1),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
}))

interface IProps extends IBooking {
  onDelete: (val: string) => void
}

const BookingItem: React.FC<IProps> = ({ event, createdAt, onDelete, _id }) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  const handleDelete = () => {
    onDelete(_id)
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="h5" component="h2">
          {event.title} {bull} {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {event._id}
        </Typography>
        <Typography variant="body2" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={handleDelete}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  )
}

export default BookingItem
