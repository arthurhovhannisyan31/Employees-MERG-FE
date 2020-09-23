// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
// local
import Modal from '_/components/Modal'
import { IEventFormAction, IEventForm } from '_/pages/Events/types'
import { AuthContext } from '_/context'

interface IProps {
  handleClose: () => void
  handleConfirm: () => void
  isOpen: boolean
  dispatch: React.Dispatch<IEventFormAction>
  eventDetailsData: Partial<IEventForm>
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  boldText: {
    fontWeight: 'bold',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}))

const DetailsModal: React.FC<IProps> = ({
  handleClose,
  isOpen,
  eventDetailsData,
  handleConfirm,
}) => {
  // useContext
  const { token } = React.useContext(AuthContext)

  const classes = useStyles()

  return (
    <Modal
      isOpen={isOpen}
      title="Event details"
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel="Book event"
      isLoading={!!eventDetailsData?.loading}
      disableConfirm={!token}
    >
      <Grid container direction="column" className={classes.container}>
        <Typography variant="h6" className={classes.boldText}>
          {eventDetailsData?.title}
        </Typography>
        <Typography className={classes.boldText}>
          ${eventDetailsData?.price?.toFixed(2)} -{' '}
          {new Date(eventDetailsData?.date as Date).toLocaleDateString()}
        </Typography>
        <Typography>{eventDetailsData?.description}</Typography>
      </Grid>
    </Modal>
  )
}

export default DetailsModal
