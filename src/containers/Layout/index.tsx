// deps
import React, { useContext, useMemo } from 'react'
import { CssBaseline } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
// components
import Header from '_/components/Layout/Header'
import MenuDrawer from '_/components/Layout/MenuDrawer'
// helpers
import themeCreator from '_/utils/theme'
import { ThemeContext } from '_/context'
import { getMenuDrawerItems, routesIconMap } from '_/containers/Layout/helpers'
import { ROUTES } from '_/utils/constants'

import useStyles from '_/containers/Layout/style'

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
