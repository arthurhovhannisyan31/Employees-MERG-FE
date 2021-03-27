// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

// todo move to theme constants
const drawerWidth = 240

export default makeStyles((theme: Theme) => ({
  container: {},
  link: {
    color: 'white',
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}))
