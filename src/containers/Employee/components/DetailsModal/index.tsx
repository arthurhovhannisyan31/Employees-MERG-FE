// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { FormikState, useFormik } from 'formik'
// components
import Modal from '_/components/UI/Modal'
import Dialog from '_/components/UI/Dialog'
// model
import { Employee } from '_/model/generated/graphql'
import { IEmployeeModalProps } from '_/containers/Employee/components/DetailsModal/types'
// helpers
import {
  initStateSelector,
  validationSchema,
} from '_/containers/Employee/components/DetailsModal/helpers'
import useStyles from './styles'

interface IDetailsModalProps {
  isOpen: boolean
  handleClose: () => void
  data: Employee
  onSubmit: (
    props: IEmployeeModalProps,
    resetForm: (
      nextState?: Partial<FormikState<IEmployeeModalProps>> | undefined,
    ) => void,
  ) => void
}

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
]

const DetailsModal: React.FC<IDetailsModalProps> = ({
  isOpen,
  handleClose,
  data,
  onSubmit,
}) => {
  const cls = useStyles()
  const initState: IEmployeeModalProps = initStateSelector(data)

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
    onSubmit: (submitValues: IEmployeeModalProps) => {
      onSubmit(submitValues, resetForm)
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={handleClose} disableClickAway>
      <Dialog onCancel={handleClose}>
        <Grid container className={cls.container} direction="column">
          <Typography className={cls.label}>Employee form</Typography>
          <div className={cls.fieldsGrid}>
            <TextField
              className={cls.field}
              name="first_name"
              label="First name"
              variant="outlined"
              value={values.first_name}
              // onChange={handleChangeText('title')}
              // onBlur={handleSaveOnBlur}
              error={!!(errors.first_name && touched.first_name)}
              helperText={errors.first_name}
            />
            <TextField
              className={cls.field}
              name="last_name"
              label="Last name"
              variant="outlined"
              value={values.last_name}
              // onChange={handleChangeText('title')}
              // onBlur={handleSaveOnBlur}
              error={!!(errors.last_name && touched.last_name)}
              helperText={errors.last_name}
            />
            <KeyboardDatePicker
              name="hire_date"
              label="Hire date"
              inputVariant="outlined"
              clearable
              autoOk
              margin="normal"
              id="hire_date-date-picker-dialog"
              format="dd/MM/yyyy"
              // value={values.date}
              value={null}
              // onChange={handleChangeDate('date')}
              onChange={() => {}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={cls.keyboardDatePicker}
              // onBlur={handleSaveOnBlur}
              error={!!(errors.hire_date && touched.hire_date)}
              helperText={errors.hire_date}
            />
            <KeyboardDatePicker
              name="birth_date"
              label="Birth date"
              inputVariant="outlined"
              clearable
              autoOk
              margin="normal"
              id="birth_date-date-picker-dialog"
              format="dd/MM/yyyy"
              // value={values.date}
              value={null}
              // onChange={handleChangeDate('date')}
              onChange={() => {}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={cls.keyboardDatePicker}
              // onBlur={handleSaveOnBlur}
              error={!!(errors.birth_date && touched.birth_date)}
              helperText={errors.birth_date}
            />
            <TextField
              id="-title-select"
              name="title"
              select
              label="Select"
              // value={currency}
              // onChange={handleChange}
              error={!!(errors.title && touched.title)}
              helperText={errors.title}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              name="department"
              select
              label="Select"
              // value={currency}
              // onChange={handleChange}
              error={!!(errors.department && touched.department)}
              helperText={errors.department}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
      </Dialog>
    </Modal>
  )
}

export default DetailsModal
