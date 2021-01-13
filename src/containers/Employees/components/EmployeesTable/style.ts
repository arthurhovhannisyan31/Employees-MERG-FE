// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: { position: 'relative' },
  loadingSplash: {
    position: 'absolute',
    height: '100%',
  },
  loadingIndicator: { padding: theme.spacing(5) },
  avatar: { cursor: 'pointer' },
}))
