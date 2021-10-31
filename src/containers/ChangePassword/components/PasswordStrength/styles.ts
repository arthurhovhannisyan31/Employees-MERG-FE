// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

interface StylesProps {
  hasError: boolean
}

export default makeStyles<Theme, StylesProps>((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(1),
  },
  checkIcon: {
    fontSize: theme.spacing(2),
    opacity: 0,
    fill: theme.palette.success.light,
  },
  checkIconVisible: {
    opacity: 1,
  },
  checkLabelError: {
    color: theme.palette.error.light,
  },
  checkLabelSuccess: {
    color: theme.palette.success.light,
  },
}))
