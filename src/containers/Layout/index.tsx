// deps
import React from 'react'
import themeCreator from '_/theme'
import {
  CssBaseline,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Header from '_/containers/Header'
import {
  ThemeProvider,
} from '@material-ui/core/styles'
// helpers
import {
  ThemeContext,
} from '_/context'
import useStyles from '_/containers/Layout/style'

const Layout: React.FC = ({
  children,
}) => {
  // context
  const {
    darkMode,
  } = React.useContext(ThemeContext)
  // styles
  const classes = useStyles()

  return (
    <ThemeProvider theme={themeCreator({
      darkMode,
    })}
    >
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
