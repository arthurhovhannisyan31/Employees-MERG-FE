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
import { Employee, Department, Title } from '_/model/generated/graphql'
import { IEmployeeModalProps } from '_/containers/Employee/components/DetailsModal/types'
// helpers
import {
  initStateSelector,
  sortByName,
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
  departments?: Omit<Department, '__typename'>[]
  titles?: Omit<Title, '__typename'>[]
}

const DetailsModal: React.FC<IDetailsModalProps> = ({
  isOpen,
  handleClose,
  data,
  onSubmit,
  titles,
  departments,
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

  const handleChangeText = React.useCallback(
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, event.target.value)
    },
    [setFieldValue],
  )

  const handleChangeDate = React.useCallback(
    (field: string) => (dateValue: Date | null) => {
      setFieldValue(field, dateValue)
    },
    [setFieldValue],
  )

  //   const handleCancel = React.useCallback(() => {
  //     handleClose()
  //     dispatch({ type: 'eventFormReset' })
  //     resetForm({})
  //   }, [handleClose, dispatch, resetForm])

  // const disableConfirm = !(isValid && values?.title)

  const titleOptions = React.useMemo(
    () =>
      titles?.sort(sortByName).map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {option.name}
        </MenuItem>
      )),
    [titles],
  )

  const departmentOptions = React.useMemo(
    () =>
      departments?.sort(sortByName).map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {option.name}
        </MenuItem>
      )),
    [departments],
  )

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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
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
              value={values.hire_date}
              // onChange={handleChangeDate('date')}
              onChange={() => {}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={cls.keyboardDatePicker}
              onBlur={handleBlur}
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
              value={values.birth_date}
              // onChange={handleChangeDate('date')}
              onChange={() => {}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={cls.keyboardDatePicker}
              onBlur={handleBlur}
              error={!!(errors.birth_date && touched.birth_date)}
              helperText={errors.birth_date}
            />
            <TextField
              id="-title-select"
              name="title"
              select
              label="Select"
              value={values.title}
              // onChange={handleChange}
              error={!!(errors.title && touched.title)}
              helperText={errors.title}
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
              onBlur={handleBlur}
            >
              {titleOptions}
            </TextField>
            <TextField
              id="standard-select-currency"
              name="department"
              select
              label="Select"
              value={values.department}
              // onChange={handleChange}
              error={!!(errors.department && touched.department)}
              helperText={errors.department}
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
              onBlur={handleBlur}
            >
              {departmentOptions}
            </TextField>
          </div>
        </Grid>
      </Dialog>
    </Modal>
  )
}

export default DetailsModal
