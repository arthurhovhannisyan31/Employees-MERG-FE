// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  inputItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  fieldsGrid: {
    display: 'grid',
    gridGap: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  keyboardDatePicker: {
    margin: 0,
  },
}))
