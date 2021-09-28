import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import Dialog from 'components/UI/Dialog'
import { errorArrayToMap } from 'containers/Auth/components/helpers'
import { validationSchema } from 'containers/Auth/components/SingIn/helpers'
import { useLogin } from 'containers/Auth/hooks'
import { useForgottenPassword } from 'containers/Auth/hooks/useForgottenPassword'
import { AuthContext } from 'context/auth'
import { handleEnterKeyDown } from 'utils/keyboard'

import { UserInput } from 'model/generated'

import useStyles from './styles'

const SignIn: FC = () => {
  const { dispatch, errors: authErrors } = useContext(AuthContext)
  const forgottenPassword = useForgottenPassword()
  const handleLogin = useLogin({
    dispatch,
  })

  const classes = useStyles({ hasError: !!authErrors?.length })

  const initState: UserInput = {
    email: '',
    password: '',
  }

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
  } = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: (submitValues: UserInput) => {
      handleLogin(submitValues)
    },
  })

  const handleForgottenPassword = useCallback(() => {
    forgottenPassword({ input: { email: values.email } })
  }, [forgottenPassword, values.email])

  const handleTextField = useCallback(
    (field: string) =>
      (event: ChangeEvent<HTMLInputElement>): void => {
        setFieldValue(field, event.target.value)
      },
    [setFieldValue],
  )

  const handleClear = useCallback(() => resetForm(), [resetForm])

  const disableConfirm = useMemo<boolean>(
    () => !(isValid && values.email),
    [isValid, values.email],
  )

  const disableForgottenPassword = useMemo<boolean>(
    () => !(values.email && !errors.email),
    [values.email, errors.email],
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

  useEffect(handleUpdateErrors, [handleUpdateErrors])

  // todo set fix width and helper text width
  // todo query forgotten password state
  // notification please check your email or try again later

  return (
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
      <Grid container direction="column" spacing={2} className={classes.fields}>
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
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={values.password}
            onChange={handleTextField('password')}
            onKeyDown={handleKeyDownSubmit}
            onBlur={handleBlur}
            error={!!(errors.password && touched.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item>
          <Button
            // todo disabled based on personal props
            disabled={disableForgottenPassword}
            // can forget password once in 24 hours
            // block account until reset password
            // reset prev password
            onClick={handleForgottenPassword}
            variant="text"
          >
            Forgot password
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default SignIn
