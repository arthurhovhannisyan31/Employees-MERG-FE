import { CssBaseline } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { useContext, FC } from 'react'
import Hidden from '@material-ui/core/Hidden'

import Header from 'components/Header'
import MenuDrawer from '_/components/Layout/MenuDrawer'
import useStyles from 'containers/Layout/style'
import { ThemeContext } from 'context'
import themeCreator from 'utils/theme'
import { getMenuDrawerItems, routesIconMap } from 'containers/Layout/helpers'
import { ROUTES } from 'utils/constants'

const Layout: FC = ({ children }) => {
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
