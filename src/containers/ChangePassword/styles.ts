// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

interface StylesProps {
  hasError: boolean
}

export default makeStyles<Theme, StylesProps>(() => ({
  container: {
    height: '100%',
  },
}))
