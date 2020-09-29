// helpers
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {},
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  loadingIndicator: {
    padding: theme.spacing(5),
  },
}))
