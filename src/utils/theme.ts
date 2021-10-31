import { createTheme, Theme } from '@material-ui/core/styles'

const theme = (props: Record<string, string | number | boolean>): Theme =>
  createTheme({
    palette: {
      type: props.darkMode ? 'dark' : 'light',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            height: '100%',
          },
          body: {
            height: '100%',
          },
          '#root': {
            height: '100%',
          },
        },
      },
    },
  })

export default theme
