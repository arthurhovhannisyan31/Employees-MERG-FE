// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '90vw',
  },
  paper: {
    width: '100%',
  },
  content: { padding: theme.spacing(1) },
  header: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
  },
  actions: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  controls: { margin: `0 ${theme.spacing(1)}px`, position: 'relative' },
  backDrop: { zIndex: 10 },
  circularProgress: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))
