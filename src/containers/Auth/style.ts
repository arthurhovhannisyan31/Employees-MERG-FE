import { makeStyles, Theme } from '@material-ui/core/styles'

interface StylesProps {
  hasError: boolean
}

export default makeStyles<Theme, StylesProps>((theme) => ({
  container: {
    height: `calc(100% - ${theme.spacing(10)}px)`,
  },
  paper: {
    padding: theme.spacing(2),
    border: ({ hasError }) => (hasError ? '1px solid red' : 'none'),
    boxSizing: 'border-box',
  },
  headTitle: { textAlign: 'center' },
  errorMessage: {
    color: 'red',
  },
}))
