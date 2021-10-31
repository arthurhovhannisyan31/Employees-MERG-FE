import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  link: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    letterSpacing: 'unset',
    fontSize: theme.spacing(1.6),
    textTransform: 'uppercase',
  },
  container: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: theme.spacing(5),
  },
}))
