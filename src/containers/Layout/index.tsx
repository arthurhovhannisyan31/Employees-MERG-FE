// deps
import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// components
import Header from 'components/Layout/Header'
// helpers

import useStyles from 'containers/Layout/style'

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      className={classes.container}
      wrap="nowrap"
    >
      <CssBaseline />
      <Header />
      <Grid container direction="column" item className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}

export default Layout
