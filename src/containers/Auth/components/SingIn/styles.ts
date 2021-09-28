import { makeStyles, Theme } from '@material-ui/core/styles'

interface StylesProps {
  hasError: boolean
}

enum StyleFields {
  container = 'container',
  fields = 'fields',
}

export default makeStyles<Theme, StylesProps, StyleFields>((theme) => ({
  container: {
    border: ({ hasError }) => (hasError ? '1px solid red' : 'none'),
    borderRadius: ({ hasError }) => (hasError ? theme.spacing(0.5) : 'none'),
    boxSizing: 'border-box',
  },
  fields: {
    paddingTop: theme.spacing(2),
  },
}))
