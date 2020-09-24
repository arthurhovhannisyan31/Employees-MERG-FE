// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers'
// components
import NumberFormatCustom from '_/pages/Events/components/NumberFormatCustom'
import Modal from '_/components/Modal'
// helpers
import { IEventForm, IEventFormAction } from '_/pages/Events/types'
import useStyles from '_/pages/Events/components/EventModal/style'

interface IProps {
  handleClose: () => void
  handleConfirm: () => void
  dispatch: React.Dispatch<IEventFormAction>
  eventFormData: IEventForm
}

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
        <div className={classes.fieldsGrid}>
          <TextField
            name="Title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleChangeText('title')}
          />
          <TextField
            name="Price"
            label="Price"
            variant="outlined"
            value={price}
            onChange={handleChangeNumber('price')}
            InputProps={{
              inputComponent: NumberFormatCustom as never,
            }}
          />
          <KeyboardDatePicker
            name="Date"
            label="Date"
            inputVariant="outlined"
            autoOk
            disablePast
            margin="normal"
            id="date-picker-dialog"
            format="dd:MM:yyyy"
            value={date}
            onChange={handleChangeDate('date')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.keyboardDatePicker}
          />
          <TextField
            name="Description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleChangeText('description')}
            multiline
            rowsMax={4}
            rows={4}
          />
        </div>
      </Grid>
    </Modal>
  )
}

export default EventModal
