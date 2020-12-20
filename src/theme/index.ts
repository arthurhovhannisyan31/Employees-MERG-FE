// deps
import { createMuiTheme } from '@material-ui/core/styles'

const theme = (props: Record<string, string | number | boolean>) =>
  createMuiTheme({
    palette: {
      type: props.darkMode ? 'dark' : 'light',
      primary: {
        light: '#798603',
        main: '#5d5c61',
        dark: '#C38D9E',
        contrastText: '#fff',
      },
      secondary: {
        main: '#379683',
        light: '#7395ae',
        dark: '#557a95',
        contrastText: '#379683',
      },
    },
  })

export default theme
