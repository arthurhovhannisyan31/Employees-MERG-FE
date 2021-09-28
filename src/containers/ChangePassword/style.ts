import { makeStyles, Theme } from '@material-ui/core/styles'

interface StylesProps {
  hasError: boolean
}

export default makeStyles<Theme, StylesProps>((theme) => ({
  container: {
    height: '100%',
  },
  passwordsInequality: {
    color: theme.palette.error.light,
  },
}))
