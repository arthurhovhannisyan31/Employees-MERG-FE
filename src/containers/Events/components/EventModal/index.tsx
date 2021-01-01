// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'
import {
  useFormik,
} from 'formik'
// components
import NumberFormatCustom from '_/containers/Events/components/NumberFormatCustom'
import Modal from '_/components/UI/Modal'
// helpers
import {
  getInitState,
  validationSchema,
} from '_/containers/Events/components/EventModal/helpers'
import {
  IEventForm,
  IEventFormAction,
  IEventFormFields,
} from '_/containers/Events/types'
import useStyles from '_/containers/Events/components/EventModal/style'
import {
  regExp,
} from '_/utils/helpers'

interface IProps {
  handleClose: () => void
  onSubmit: (values: IEventFormFields, resetForm: () => void) => void
  dispatch: React.Dispatch<IEventFormAction>
  eventFormData: IEventForm
}

const EventModal: React.FC<IProps> = ({
  handleClose,
  onSubmit,
  dispatch,
  eventFormData: {
    isOpen, loading, fields,
  },
}) => {
  // styles
  const cls = useStyles()
  const initState = getInitState(fields)

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleSubmit,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: initState,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (submitValues: IEventFormFields) => {
      onSubmit(submitValues, resetForm)
    },
  })

  // memo
  const memoPriceFormat = React.useCallback(
    (props) => NumberFormatCustom({
      prefix: '$',
    })(props),
    [],
  )
  const handleChangeText = React.useCallback(
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, event.target.value)
    },
    [setFieldValue],
  )
  const handleChangeNumber = React.useCallback(
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        event.target.value.match(regExp.numbers)
        || event.target.value === ''
      ) {
        handleChangeText(field)(event)
      }
    },
    [handleChangeText],
  )
  const handleSaveOnBlur = React.useCallback(
    (e: React.FocusEvent<never>) => {
      handleBlur(e)
      dispatch({
        type: 'eventForm', payload: values,
      })
    },
    [handleBlur, dispatch, values],
  )
  const handleCancel = React.useCallback(() => {
    handleClose()
    dispatch({
      type: 'eventFormReset',
    })
    resetForm({
    })
  }, [handleClose, dispatch, resetForm])
  const handleChangeDate = React.useCallback(
    (field: string) => (dateValue: Date | null) => {
      setFieldValue(field, dateValue)
    },
    [setFieldValue],
  )

  const disableConfirm = !(isValid && values?.title)

  return (
    <Modal
      isOpen={isOpen}
      title="Create event"
      onCancel={handleCancel}
      onClose={handleClose}
      onConfirm={handleSubmit}
      disableConfirm={disableConfirm}
      isLoading={loading}
    >
      <Grid className={cls.container} container direction="column">
        <Typography>Event form</Typography>
        <div className={cls.fieldsGrid}>
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
              inputComponent: memoPriceFormat,
            }}
            onBlur={handleSaveOnBlur}
            error={!!(errors.price && touched.price)}
            helperText={errors.price}
          />
          <KeyboardDatePicker
            name="date"
            label="Date"
            inputVariant="outlined"
            clearable
            autoOk
            disablePast
            margin="normal"
            id="date-picker-dialog"
            format="dd/MM/yyyy"
            value={values.date}
            onChange={handleChangeDate('date')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={cls.keyboardDatePicker}
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
