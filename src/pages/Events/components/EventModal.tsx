// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import { makeStyles, Theme } from '@material-ui/core/styles'
// local
import { IEventForm, IEventFormAction } from '_/pages/Events'
import Modal from '_/components/Modal'

interface IProps {
  handleClose: () => void
  handleConfirm: () => void
  dispatch: React.Dispatch<IEventFormAction>
  eventFormData: IEventForm
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  inputItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}))

const EventModal: React.FC<IProps> = ({
  handleClose,
  handleConfirm,
  dispatch,
  eventFormData: { description, isOpen, price, title, date, loading },
}) => {
  // useStyles
  const classes = useStyles()

  const handleChangeText = (prop: string) => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'eventForm', prop, payload: value })
  }

  const handleChangeNumber = (prop: string) => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'eventForm', prop, payload: +value >= 0 ? value : 0 })
  }

  const handleChangeDate = (prop: string) => (dateValue: Date | null) => {
    dispatch({ type: 'eventForm', prop, payload: dateValue })
  }

  const disableConfirm = !title.trim() || !description.trim() || !price || !date

  return (
    <Modal
      isOpen={isOpen}
      title="Create event"
      onCancel={handleClose}
      onConfirm={handleConfirm}
      disableConfirm={disableConfirm}
      isLoading={loading}
    >
      <Grid className={classes.container} container direction="column">
        <Typography>Event form</Typography>
        <TextField
          label="Title"
          className={classes.inputItem}
          value={title}
          onChange={handleChangeText('title')}
          variant="outlined"
        />

        <TextField
          label="Price"
          className={classes.inputItem}
          type="number"
          value={price}
          onChange={handleChangeNumber('price')}
          variant="outlined"
        />
        <KeyboardDateTimePicker
          label="Date"
          className={classes.inputItem}
          inputVariant="outlined"
          autoOk
          disablePast
          margin="normal"
          id="date-picker-dialog"
          format="dd:MM:yyyy hh:mm"
          value={date}
          onChange={handleChangeDate('date')}
          ampm={false}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleChangeText('description')}
          variant="outlined"
          multiline
          rowsMax={4}
          rows={4}
        />
      </Grid>
    </Modal>
  )
}

export default EventModal
