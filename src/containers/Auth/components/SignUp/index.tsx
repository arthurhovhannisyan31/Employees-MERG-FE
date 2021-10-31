import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useFormik } from 'formik'
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import Dialog from 'components/UI/Dialog'
import { errorArrayToMap } from 'containers/Auth/components/helpers'
import {
  initState,
  validationSchema,
} from 'containers/Auth/components/SignUp/helpers'
import { SignUpProps } from 'containers/Auth/components/SignUp/types'
import { useCreateUser } from 'containers/Auth/hooks/useCreateUser'
import PasswordStrength from 'containers/ChangePassword/components/PasswordStrength'
import { PassportStrengthValidation } from 'containers/ChangePassword/components/PasswordStrength/types'
import { getPasswordStrength } from 'containers/ChangePassword/helpers'
import { AuthContext } from 'context'
import { handleEnterKeyDown } from 'utils/keyboard'

import useStyles from './styles'

const SignUp: FC = () => {
  const { dispatch, errors: authErrors, isFetching } = useContext(AuthContext)
  const handleCreateUser = useCreateUser({
    dispatch,
  })

  const classes = useStyles({ hasError: !!authErrors?.length })

  const {
    values,
    errors,
    setFieldValue,
    setErrors,
    touched,
    handleBlur,
    handleSubmit,
    isValid,
    resetForm,
    dirty,
  } = useFormik<SignUpProps>({
    initialValues: initState,
    validationSchema,
    onSubmit: ({ email, name, password }: SignUpProps) => {
      handleCreateUser({ name, email, password })
    },
  })

  const passwordValidation = useMemo<PassportStrengthValidation>(
    () => getPasswordStrength(values.password),
    [values.password],
  )

  const handleTextField = useCallback(
    (field: string) =>
      (event: ChangeEvent<HTMLInputElement>): void => {
        setFieldValue(field, event.target.value)
      },
    [setFieldValue],
  )

  const handleClear = useCallback(() => resetForm(), [resetForm])

  const disableConfirm = useMemo<boolean>(
    () => !(isValid && values.email && passwordValidation.allValid),
    [isValid, passwordValidation.allValid, values.email],
  )

  const handleKeyDownSubmit = useCallback(
    (event: KeyboardEvent) => {
      if (!disableConfirm) {
        handleEnterKeyDown(handleSubmit)(event)
      }
    },
    [disableConfirm, handleSubmit],
  )

  const handleUpdateErrors = useCallback(() => {
    setErrors(errorArrayToMap(authErrors))
  }, [authErrors, setErrors])

  const handleClickShowPassword = useCallback(() => {
    setFieldValue('showPassword', !values.showPassword)
  }, [setFieldValue, values])

  useEffect(handleUpdateErrors, [handleUpdateErrors])

  return (
    <Dialog
      confirmLabel="Submit"
      onConfirm={handleSubmit}
      isLoading={isFetching}
      cancelLabel="Clear"
      onCancel={handleClear}
      disableConfirm={disableConfirm}
      disableCancel={!dirty}
      className={classes.container}
    >
      <Grid container direction="column" spacing={2} className={classes.fields}>
        <Grid item>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            fullWidth
            value={values.name}
            onChange={handleTextField('name')}
            onKeyDown={handleKeyDownSubmit}
            onBlur={handleBlur}
            error={!!(errors.name && touched.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={values.email}
            onChange={handleTextField('email')}
            onKeyDown={handleKeyDownSubmit}
            onBlur={handleBlur}
            error={!!(errors.email && touched.email)}
            helperText={errors.email}
          />
        </Grid>
        <Grid item>
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
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
      </Grid>
    </Dialog>
  )
}

export default SignUp
