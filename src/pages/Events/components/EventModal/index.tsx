// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useFormik } from 'formik'
// components
import NumberFormatCustom from '_/pages/Events/components/NumberFormatCustom'
import Modal from '_/components/Modal'
// helpers
import {
  getInitState,
  validationSchema,
} from '_/pages/Events/components/EventModal/helpers'
import { IEventForm, IEventFormAction } from '_/pages/Events/types'
import useStyles from '_/pages/Events/components/EventModal/style'
import { regExp } from '_/utils/helpers'
import { eventFormInitState } from '_/pages/Events/helpers'

interface IProps {
  handleClose: () => void
  onSubmit: (values: Partial<IEventForm>) => void
  dispatch: React.Dispatch<IEventFormAction>
  eventFormData: IEventForm
}

const EventModal: React.FC<IProps> = ({
  handleClose,
  onSubmit,
  dispatch,
  eventFormData,
  eventFormData: { isOpen, loading },
}) => {
  // useStyles
  const classes = useStyles()

  const initState = getInitState(eventFormData)

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: initState,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (submitValues: Partial<IEventForm>) => {
      console.log(submitValues)
      onSubmit(submitValues)
    },
  })
  const handleChangeText = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue(field, event.target.value)
  }
  const handleChangeNumber = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.match(regExp.numbers) || event.target.value === '') {
      handleChangeText(field)(event)
    }
  }
  const handleSaveOnBlur = (e: React.FocusEvent<never>) => {
    handleBlur(e)
    dispatch({ type: 'eventForm', payload: values })
  }
  const handleCancel = () => {
    handleClose()
    dispatch({ type: 'eventForm', payload: eventFormInitState })
  }
  const handleChangeDate = (field: string) => (dateValue: Date | null) => {
    setFieldValue(field, dateValue)
  }

  const disableConfirm = !(isValid && values?.title)

  console.log(errors)
  console.log(values)

  return (
    <Modal
      isOpen={isOpen}
      title="Create event"
      onCancel={handleCancel}
      onConfirm={handleSubmit}
      disableConfirm={disableConfirm}
      isLoading={loading}
    >
      <Grid className={classes.container} container direction="column">
        <Typography>Event form</Typography>
        <div className={classes.fieldsGrid}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={values.title}
            onChange={handleChangeText('title')}
            onBlur={handleSaveOnBlur}
            error={!!(errors.title && touched.title)}
            helperText={errors.title}
          />
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            value={values.price}
            onChange={handleChangeNumber('price')}
            InputProps={{
              inputComponent: NumberFormatCustom as never,
            }}
            onBlur={handleSaveOnBlur}
            error={!!(errors.price && touched.price)}
            helperText={errors.price}
          />
          <KeyboardDatePicker
            name="date"
            label="Date"
            inputVariant="outlined"
            autoOk
            disablePast
            margin="normal"
            id="date-picker-dialog"
            format="dd:MM:yyyy"
            value={values.date}
            onChange={handleChangeDate('date')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.keyboardDatePicker}
            onBlur={handleSaveOnBlur}
            error={!!(errors.date && touched.date)}
            helperText={errors.date}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={values.description}
            onChange={handleChangeText('description')}
            multiline
            rowsMax={4}
            rows={4}
            onBlur={handleSaveOnBlur}
            error={!!(errors.description && touched.description)}
            helperText={errors.description}
          />
        </div>
      </Grid>
    </Modal>
  )
}

export default EventModal
