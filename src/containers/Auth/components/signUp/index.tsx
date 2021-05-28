// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
// components
import Dialog from '_/components/UI/Dialog'
// model
import { IUseLoginReturnProps } from '_/containers/Auth/hooks'

interface ISignUpProps {
  handleSubmit: (props: IUseLoginReturnProps) => void
}

const SignUp: React.FC<ISignUpProps> = () => {
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
      </Grid>
    </Dialog>
  )
}

export default SignUp
