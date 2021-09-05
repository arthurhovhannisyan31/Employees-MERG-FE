// deps
import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
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
import PasswordStrength from '_/containers/ChangePassword/components/PasswordStrength'
// model
import { PassportStrengthValidation } from '_/containers/ChangePassword/components/PasswordStrength/types'
import { ChangePasswordState } from '_/containers/ChangePassword/types'
// helpers
import { handleEnterKeyDown } from '_/utils/keyboard'
import { getPasswordStrength, initState } from './helpers'
import useStyles from './styles'

const ChangePassword: React.FC = () => {
  const classes = useStyles({ hasError: false })
  const { id: forgottenPasswordId } = useParams<Record<'id', string>>()

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initState,
    onSubmit: ({ password }: ChangePasswordState) => {
      console.log(password, forgottenPasswordId)
      // send new password to the BE
    },
  })

  const passwordValidation = useMemo<PassportStrengthValidation>(
    () => getPasswordStrength(values.password),
    [values.password],
  )
  const confirmPasswordValidation = useMemo<PassportStrengthValidation>(
    () => getPasswordStrength(values.confirmPassword),
    [values.confirmPassword],
  )

  const handleClear = useCallback(() => resetForm(), [resetForm])

  const handleTextField = useCallback(
    (field: string) =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue(field, event.target.value)
      },
    [setFieldValue],
  )

  const passwordsInequality = values.password !== values.confirmPassword

  const disableConfirm = useMemo<boolean>(
    () =>
      !(
        values.password === values.confirmPassword &&
        passwordValidation.allValid &&
        confirmPasswordValidation.allValid
      ),
    [
      values.password,
      values.confirmPassword,
      passwordValidation,
      confirmPasswordValidation,
    ],
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

  const disableCancel = !(values.password || values.confirmPassword)

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
        item
        xs={4}
      >
        <Dialog
          confirmLabel="Submit"
          onConfirm={handleSubmit}
          isLoading={false}
          cancelLabel="Clear"
          onCancel={handleClear}
          disableConfirm={disableConfirm}
          disableCancel={disableCancel}
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
                  id="password"
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
              <PasswordStrength
                validation={passwordValidation}
                touched={!!touched.password}
              />
            </Grid>
            <Grid item container>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  id="confirmPassword"
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
              <PasswordStrength
                validation={confirmPasswordValidation}
                touched={!!touched.confirmPassword}
              />
            </Grid>
            {passwordsInequality && (
              <Grid item container>
                <Typography
                  className={classes.passwordsInequality}
                  variant="subtitle2"
                >
                  Passwords are not equal!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default ChangePassword
