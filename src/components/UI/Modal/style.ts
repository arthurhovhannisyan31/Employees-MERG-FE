// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '90vw',
    width: theme.spacing(50),
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  },
}))
