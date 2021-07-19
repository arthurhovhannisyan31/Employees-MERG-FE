// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

interface StylesProps {
  hasError: boolean
}

export default makeStyles<Theme, StylesProps>((theme) => ({
  container: {
    height: `calc(100% - ${theme.spacing(10)}px)`,
  },
}))
