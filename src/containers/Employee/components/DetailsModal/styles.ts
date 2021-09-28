import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(1),
    width: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  fieldsGrid: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(2, minmax(250px, 1fr))',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  field: {
    maxWidth: '300px',
    height: 'auto',
  },
  keyboardDatePicker: {
    margin: 0,
  },
}))
