// deps
import React, { useCallback, useContext, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
// model
import { UserInput } from '_/model/generated'
// components
import Dialog from '_/components/UI/Dialog'
import ErrorMessages from '_/containers/Auth/components/ErrorMessages'
// model
import { useLogin } from '_/containers/Auth/hooks'
// helpers
import { AuthContext } from '_/context/auth'
import { handleEnterKeyDown } from '_/utils/keyboard'
import { validationSchema } from '_/containers/Auth/components/SingIn/helpers'
import useStyles from './styles'

const SignIn: React.FC = () => {
  const { dispatch, errors: authErrors } = useContext(AuthContext)

  const classes = useStyles({ hasError: !!authErrors?.length })

  const initState: UserInput = {
    email: '',
    password: '',
  }

  const handleLogin = useLogin({
    dispatch,
  })

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
    onSubmit: (submitValues: UserInput) => {
      handleLogin(submitValues)
    },
  })

  const handleTextField = useCallback(
    (field: string) =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue(field, event.target.value)
      },
    [setFieldValue],
  )

  const handleClear = useCallback(() => resetForm(), [resetForm])

  const disableConfirm = useMemo<boolean>(
    () => !(isValid && values.email),
    [isValid, values.email],
  )

  const handleKeyDownSubmit = useCallback(
    (event: React.KeyboardEvent) => {
      if (!disableConfirm) {
        handleEnterKeyDown(handleSubmit)(event)
      }
    },
    [disableConfirm, handleSubmit],
  )

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
        <ErrorMessages authErrors={authErrors} />
        <Grid item>
          <Button
            disabled={false} // todo disabled based on personal props
            // can forget password once in 24 hours
            // block account until reset password
            // reset prev password
            onClick={() => {
              console.log('forgot password')
            }}
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
