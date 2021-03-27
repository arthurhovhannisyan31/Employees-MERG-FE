import { makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 240

export default makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
    margin: '0 auto',
    maxWidth: '1600px',
    padding: theme.spacing(1),
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}))
