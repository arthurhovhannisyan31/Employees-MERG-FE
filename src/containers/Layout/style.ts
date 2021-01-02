// deps
import { makeStyles, Theme, } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  header: { height: theme.spacing(6), },
  container: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
    maxWidth: '1600px',
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(1),
    flexGrow: 1,
  },
}))
