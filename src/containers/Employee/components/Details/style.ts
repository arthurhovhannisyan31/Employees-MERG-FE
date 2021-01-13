// deps
import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {
    padding: 0,
  },
  personal: {
    display: 'flex',
    flexFlow: 'column',
  },
  avatarContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  name: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
  },
  rowsContainer: {
    paddingBottom: theme.spacing(3),
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))
