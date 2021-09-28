import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { FormikState, useFormik } from 'formik'
import isEqual from 'lodash.isequal'
import React, { FC, useCallback, useMemo, ChangeEvent } from 'react'

import Dialog from 'components/UI/Dialog'
import Modal from 'components/UI/Modal'
import {
  initStateSelector,
  sortByName,
  validationSchema,
} from 'containers/Employee/components/DetailsModal/helpers'

import {
  Employee,
  Department,
  Title,
  UpdateEmployeeInput,
} from 'model/generated'

import useStyles from './styles'

interface IDetailsModalProps {
  isOpen: boolean
  handleClose: () => void
  data: Employee
  onSubmit: (
    props: UpdateEmployeeInput,
    resetForm: (
      nextState?: Partial<FormikState<UpdateEmployeeInput>> | undefined,
    ) => void,
  ) => void
  departments?: Omit<Department, '__typename'>[]
  titles?: Omit<Title, '__typename'>[]
  isLoading: boolean
}

const DetailsModal: FC<IDetailsModalProps> = ({
  isOpen,
  handleClose,
  data,
  onSubmit,
  titles,
  departments,
  isLoading,
}) => {
  const cls = useStyles()
  const initState: UpdateEmployeeInput = initStateSelector(data)

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
    onSubmit: (submitValues: UpdateEmployeeInput) => {
      onSubmit(submitValues, resetForm)
    },
  })

  const handleChangeText = useCallback(
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, event.target.value)
    },
    [setFieldValue],
  )

  const handleChangeDate = useCallback(
    (field: string) => (dateValue: Date | null) => {
      setFieldValue(field, dateValue)
    },
    [setFieldValue],
  )

  const handleCancel = useCallback(() => {
    handleClose()
    resetForm({})
  }, [handleClose, resetForm])

  const titleOptions = useMemo(
    () =>
      titles?.sort(sortByName).map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {option.name}
        </MenuItem>
      )),
    [titles],
  )

  const departmentOptions = useMemo(
    () =>
      departments?.sort(sortByName).map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {option.name}
        </MenuItem>
      )),
    [departments],
  )

  const disableConfirm = useMemo<boolean>(
    () =>
      !(isValid && values?.first_name) ||
      isEqual(values, initState) ||
      isLoading,
    [isValid, values, initState, isLoading],
  )

  return (
    <Modal isOpen={isOpen} onClose={handleClose} disableClickAway>
      <Dialog
        onCancel={handleCancel}
        cancelLabel="Cancel"
        confirmLabel="Save"
        onConfirm={handleSubmit}
        disableConfirm={disableConfirm}
        isLoading={isLoading}
      >
        <Grid container className={cls.container} direction="column">
          <Typography className={cls.label}>Employee form</Typography>
          <div className={cls.fieldsGrid}>
            <TextField
              className={cls.field}
              name="first_name"
              label="First name"
              variant="outlined"
              value={values.first_name}
              onChange={handleChangeText('first_name')}
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
              onChange={handleChangeText('last_name')}
              onBlur={handleBlur}
              error={!!(errors.last_name && touched.last_name)}
              helperText={errors.last_name}
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
              onChange={handleChangeDate('birth_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={cls.keyboardDatePicker}
              onBlur={handleBlur}
              error={!!(errors.birth_date && touched.birth_date)}
              helperText={errors.birth_date}
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
              onChange={handleChangeDate('hire_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={cls.keyboardDatePicker}
              onBlur={handleBlur}
              error={!!(errors.hire_date && touched.hire_date)}
              helperText={errors.hire_date}
            />
            <TextField
              id="-title-select"
              name="title"
              select
              label="Title"
              value={values.title}
              onChange={handleChangeText('title')}
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
              label="Department"
              value={values.department}
              onChange={handleChangeText('department')}
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
