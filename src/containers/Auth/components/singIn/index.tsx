// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// components
import Dialog from '_/components/UI/Dialog'
// model
import { IUseLoginReturnProps } from '_/containers/Auth/hooks'

interface ISignInProps {
  handleSubmit: (props: IUseLoginReturnProps) => void
}

const SignIn: React.FC<ISignInProps> = () => {
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
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            value="email"
            onChange={() => null}
            onKeyDown={() => null}
            type="email"
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            value="password"
            onChange={() => null}
            onKeyDown={() => null}
            type="password"
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
