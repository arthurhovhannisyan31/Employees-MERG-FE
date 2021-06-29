// deps
import React, { useContext, useMemo } from 'react'
import { CssBaseline } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
// components
import Header from 'components/Layout/Header'
import MenuDrawer from 'components/Layout/MenuDrawer'
// helpers
import themeCreator from 'utils/theme'
import { ThemeContext } from 'context'
import { getMenuDrawerItems, routesIconMap } from 'containers/Layout/helpers'
import { ROUTES } from 'constants/routes'

import useStyles from 'containers/Layout/style'

const Layout: React.FC = ({ children }) => {
  const { darkMode } = useContext(ThemeContext)

  const classes = useStyles()
  const drawerItems = useMemo(
    () => getMenuDrawerItems(ROUTES, routesIconMap),
    [],
  )

  return (
    <ThemeProvider theme={themeCreator({ darkMode })}>
      <Grid container className={classes.container}>
        <CssBaseline />
        <Header />
        <nav className={classes.drawer}>
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <MenuDrawer items={drawerItems} />
            </Drawer>
          </Hidden>
        </nav>
        <Grid item className={classes.content}>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Layout
