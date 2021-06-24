// deps
import { createTheme, Theme } from '@material-ui/core/styles'

const theme = (props: Record<string, string | number | boolean>): Theme =>
  createTheme({
    palette: {
      type: props.darkMode ? 'dark' : 'light',
    },
  })

export default theme
