// helpers
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: theme.spacing(1),
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  loadingIndicator: {
    padding: theme.spacing(5),
  },
}))
