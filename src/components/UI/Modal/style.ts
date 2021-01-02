// deps
import { makeStyles, } from '@material-ui/core/styles'

export default makeStyles(() => ({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  },
}))
