// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
// components
import Modal from '_/components/UI/Modal'
import Dialog from '_/components/UI/Dialog';
import { IEvent } from '_/model/event'
import { AuthContext } from '_/context'

interface IProps {
  handleClose: () => void
  onSubmit: () => void
  isOpen: boolean
  loading: boolean
  eventDetailsData: IEvent | undefined
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
  onSubmit,
  loading,
}) => {
  // context
  const { token } = React.useContext(AuthContext)
  const classes = useStyles()

  return (
    <Modal
      isOpen={isOpen}
    >
      <Dialog
        title="Event details"
        onCancel={handleClose}
        onConfirm={onSubmit}
        confirmLabel="Book event"
        isLoading={loading}
        disableConfirm={!token}
      >
        <Grid container direction="column" className={classes.container}>
          <Typography variant="h6" className={classes.boldText}>
            {eventDetailsData?.title}
          </Typography>
          <Typography className={classes.boldText}>
            ${eventDetailsData?.price?.toFixed(2)} -{' '}
            {new Date(
              (eventDetailsData?.date as never) as Date,
            ).toLocaleDateString()}
          </Typography>
          <Typography>{eventDetailsData?.description}</Typography>
        </Grid>
      </Dialog>
    </Modal>
  )
}

export default DetailsModal
