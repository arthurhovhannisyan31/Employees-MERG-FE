// deps
import React, { useCallback, useMemo } from 'react'
import {
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useFormik } from 'formik'
// components
import Dialog from '_/components/UI/Dialog'
// model
import { ChangePasswordState } from '_/containers/ChangePassword/types'
// helpers
import { handleEnterKeyDown } from '_/utils/keyboard'
import { validationSchema } from './helpers'
import useStyles from './styles'

const ChangePassword: React.FC = () => {
  const classes = useStyles({ hasError: false })

  const initState: ChangePasswordState = {
    password: '',
    confirmPassword: '',
    showPassword: false,
  }

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleSubmit,
    isValid,
    resetForm,
    dirty,
  } = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: (submitValues: ChangePasswordState) => {
      console.log(submitValues)
    },
  })

  const handleClear = useCallback(() => resetForm(), [resetForm])

  const handleTextField = useCallback(
    (field: string) =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue(field, event.target.value)
      },
    [setFieldValue],
  )

  const disableConfirm = useMemo<boolean>(
    () => !(isValid && values.password),
    [isValid, values.password],
  )

  const handleKeyDownSubmit = useCallback(
    (event: React.KeyboardEvent) => {
      if (!disableConfirm) {
        handleEnterKeyDown(handleSubmit)(event)
      }
    },
    [disableConfirm, handleSubmit],
  )

  const handleClickShowPassword = useCallback(() => {
    setFieldValue('showPassword', !values.showPassword)
  }, [setFieldValue, values])

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault()
  }, [])

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Dialog
          confirmLabel="Submit"
          onConfirm={handleSubmit}
          isLoading={false}
          cancelLabel="Clear"
          onCancel={handleClear}
          disableConfirm={disableConfirm}
          disableCancel={!dirty}
          className={classes.container}
        >
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle1">
                Please type your new password
              </Typography>
            </Grid>
            <Grid item container>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleTextField('password')}
                  onKeyDown={handleKeyDownSubmit}
                  onBlur={handleBlur}
                  error={!!(errors.password && touched.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item container>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleTextField('confirmPassword')}
                  onKeyDown={handleKeyDownSubmit}
                  onBlur={handleBlur}
                  error={!!(errors.confirmPassword && touched.confirmPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default ChangePassword
