import { CssBaseline } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { useContext, FC } from 'react'

import Header from 'components/Header'
import useStyles from 'containers/Layout/style'
import { ThemeContext } from 'context'
import themeCreator from 'utils/theme'

const Layout: FC = ({ children }) => {
  const { darkMode } = useContext(ThemeContext)
  const classes = useStyles()

  return (
    <ThemeProvider theme={themeCreator({ darkMode })}>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item className={classes.header}>
          <Header />
        </Grid>
        <Grid item className={classes.container}>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Layout
