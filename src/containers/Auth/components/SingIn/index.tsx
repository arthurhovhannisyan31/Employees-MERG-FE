// deps
import React, { useCallback, useContext, useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// components
import Dialog from '_/components/UI/Dialog'
// model
import { useLogin, UseLoginReturnProps } from '_/containers/Auth/hooks'
// helpers
import { getFieldsHandlers } from '_/containers/Auth/components/helpers'
import { regExp } from '_/constants/regExp'
import { AuthContext } from '_/context/auth'
import { handleEnterKeyDown } from '_/utils/keyboard'
import useStyles from './styles'

interface ISignInProps {
  handleSubmit: (props: UseLoginReturnProps) => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

const SignIn: React.FC<ISignInProps> = () => {
  const { dispatch } = useContext(AuthContext)

  const classes = useStyles()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handlersMap = useMemo(
    () =>
      getFieldsHandlers([
        ['email', setEmail],
        ['password', setPassword],
      ]),
    [],
  )

  const handleTextField = useCallback(
    (type: string) =>
      (event: React.ChangeEvent<HTMLInputElement>): void =>
        handlersMap[type](event),
    [handlersMap],
  )

  const handleLogin = useLogin({
    dispatch,
  })

  const handleClear = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])

  const handleSubmit = useCallback(() => {
    console.log(email.match(regExp.email))
    console.log(regExp.email.exec(email))
    console.log(regExp.email.test(email))
    // handleLogin({ email, password })
  }, [email, handleLogin, password])

  const submitDisabled = false
  const clearDisabled = false

  const handleKeyDownSubmit = useCallback(
    (event: React.KeyboardEvent) => {
      if (!submitDisabled) {
        handleEnterKeyDown(handleSubmit)(event)
      }
    },
    [handleSubmit, submitDisabled],
  )

  // TODO email validation
  // TODO password strengths with rate indicator, pass only strong

  // const emailIsValid = email.match(regExp.email)

  return (
    <Dialog
      disableConfirm={submitDisabled}
      confirmLabel="Submit"
      onConfirm={handleSubmit}
      isLoading={false}
      cancelLabel="Clear"
      onCancel={handleClear}
      disableCancel={clearDisabled}
    >
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.container}
      >
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleTextField('email')}
            onKeyDown={handleKeyDownSubmit}
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleTextField('password')}
            onKeyDown={handleKeyDownSubmit}
            type="password"
            fullWidth
          />
        </Grid>
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
