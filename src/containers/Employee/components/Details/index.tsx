// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import format from 'date-fns/format'
import cn from 'clsx'
// components
// model
import { Employee } from '_/model/generated'
// helpers
import { getFirstLastNameLetters } from '_/utils/string'
import { CatalogsContext } from '../../../../context/catalogs'
import useStyles from './style'

interface IDetailsProps
  extends Omit<Employee, 'titles' | 'paychecks' | 'employments'> {
  handleOpenModal: () => void
}

const Details: React.FC<IDetailsProps> = ({
  title,
  birth_date,
  department,
  first_name,
  gender,
  hire_date,
  last_name,
  handleOpenModal,
}) => {
  // utils
  const classes = useStyles()
  const {
    state: {
      data: { departments, titles, genders },
    },
  } = React.useContext(CatalogsContext)

  const genderName = genders?.find((el) => el?._id === gender)?.name || ''
  const departmentName =
    departments?.find((el) => el?._id === department)?.name || ''
  const titleName = titles?.find((el) => el?._id === title)?.name || ''

  return (
    <Grid container className={classes.container}>
      <Grid item xs={4} className={classes.personal} container>
        <Paper>
          <IconButton
            className={cn(classes.editButton, '.editButton')}
            onClick={handleOpenModal}
          >
            <EditIcon />
          </IconButton>
          <Grid container justify="center" className={classes.avatarContainer}>
            <Avatar
              alt={`${first_name} ${last_name}`}
              className={classes.avatar}
            >
              {getFirstLastNameLetters(first_name, last_name)}
            </Avatar>
            <Typography variant="body1" className={classes.name}>
              {first_name} {last_name}
            </Typography>
          </Grid>
          <Grid className={classes.rowsContainer}>
            <Grid container className={classes.row}>
              <Typography>Hire date</Typography>
              <Typography>
                {hire_date && format(new Date(hire_date), 'MM/dd/yyyy')}
              </Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Birth date</Typography>
              <Typography>
                {birth_date && format(new Date(birth_date), 'MM/dd/yyyy')}
              </Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Gender</Typography>
              <Typography>{genderName}</Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Title</Typography>
              <Typography>{titleName}</Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Department</Typography>
              <Typography>{departmentName}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Details
