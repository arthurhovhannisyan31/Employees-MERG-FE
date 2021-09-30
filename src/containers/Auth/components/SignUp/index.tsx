import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import React, { FC } from 'react'

import Dialog from 'components/UI/Dialog'

import useStyles from './styles'

const SignUp: FC = () => {
  const classes = useStyles()
  // TODO email validation
  // TODO password strengths with rate indicator, pass only strong
  return (
    <Dialog
      confirmLabel="Submit"
      onConfirm={() => {
        // console.log('SignUp confirm')
      }}
      isLoading={false}
      cancelLabel="Clear"
      onCancel={() => {
        // console.log('SignUp clear')
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
            label="Name"
            variant="outlined"
            value="name"
            onChange={() => null}
            onKeyDown={() => null}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            value="email"
            onChange={() => null}
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
            value="password"
            onChange={() => null}
            onKeyDown={() => null}
            type="password"
            fullWidth
          />
        </Grid>{' '}
      </Grid>
    </Dialog>
  )
}

export default SignUp
