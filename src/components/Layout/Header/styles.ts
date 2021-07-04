// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {},
  link: {
    color: 'white',
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
}))
