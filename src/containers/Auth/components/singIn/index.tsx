// deps
import React, { useCallback, useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// components
import Dialog from '_/components/UI/Dialog'
// model
import { UseLoginReturnProps } from '_/containers/Auth/hooks'
// helpers
import { getFieldsHandlers } from '_/containers/Auth/components/helpers'
import useStyles from './styles'

interface ISignInProps {
  handleSubmit: (props: UseLoginReturnProps) => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

const SignIn: React.FC<ISignInProps> = () => {
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

  // TODO email validation
  // TODO password strengths with rate indicator, pass only strong

  return (
    <Dialog
      confirmLabel="Submit"
      onConfirm={() => {
        console.log('SignUp confirm')
      }}
      isLoading={false}
      cancelLabel="Clear"
      onCancel={() => {
        console.log('SignUp clear')
      }}
    >
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.container}
      >
        <Grid item>
          <TextField
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleTextField('email')}
            onKeyDown={() => null}
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleTextField('password')}
            onKeyDown={() => null}
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
