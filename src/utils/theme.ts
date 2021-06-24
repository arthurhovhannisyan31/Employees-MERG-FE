// deps
import { createMuiTheme, Theme } from '@material-ui/core/styles'

const theme = (props: Record<string, string | number | boolean>): Theme =>
  createMuiTheme({
    palette: {
      type: props.darkMode ? 'dark' : 'light',
    },
  })

export default theme
