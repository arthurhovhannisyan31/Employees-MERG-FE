import { makeStyles, Theme } from '@material-ui/core/styles'

interface IProps {
  hasError: boolean
}

export default makeStyles<Theme, IProps>((theme) => ({
  container: {
    height: `calc(100% - ${theme.spacing(10)}px)`,
  },
  paper: {
    padding: theme.spacing(2),
    border: ({ hasError }) => (hasError ? '1px solid red' : 'none'),
  },
  headTitle: { textAlign: 'center' },
  errorMessage: {
    color: 'red',
  },
}))
