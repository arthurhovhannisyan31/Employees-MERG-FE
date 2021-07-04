// deps
import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// components
import Header from '_/components/Layout/Header'
// helpers

import useStyles from '_/containers/Layout/style'

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <CssBaseline />
      <Header />
      <Grid item className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}

export default Layout
