import { CssBaseline } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { FC } from 'react'

import Header from 'components/Layout/Header'
import useStyles from 'containers/Layout/style'

const Layout: FC = ({ children }) => {
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
