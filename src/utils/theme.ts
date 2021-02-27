// deps
import { createMuiTheme } from '@material-ui/core/styles'

const theme = (props: Record<string, string | number | boolean>) =>
  createMuiTheme({
    palette: {
      type: props.darkMode ? 'dark' : 'light',
    },
  })

export default theme
