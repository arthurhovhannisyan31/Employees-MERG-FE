// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '90vw',
    width: theme.spacing(50),
  },
  content: {
    padding: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
  },
  actions: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  controls: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  backDrop: {
    zIndex: 10,
  },
  circularProgress: {
    marginLeft: theme.spacing(1),
  },
}))
