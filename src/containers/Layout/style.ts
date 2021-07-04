import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    height: '100%',
  },
  content: {
    margin: '0 auto',
    maxWidth: '1600px',
    padding: theme.spacing(1),
    flexGrow: 1,
  },
}))
