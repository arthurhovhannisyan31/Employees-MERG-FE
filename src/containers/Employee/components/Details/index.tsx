// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import format from 'date-fns/format'
// components
// model
import { Employee } from '_/model/generated/graphql'
// helpers
import { getFirstLastNameLetters } from '_/utils/string'
import useStyles from './style'

type TDetailsProps = Omit<Employee, 'titles'|'paychecks'|'employments'>

const Details: React.FC<TDetailsProps> = ({
  title, birth_date, department, first_name, gender, hire_date, last_name,
}) => {
  // utils
  const classes = useStyles()
  console.log(hire_date)
  console.log()

  return (
    <Grid container className={classes.container}>
      <Grid xs={4} className={classes.personal} container>
        <Paper>
          <Grid container justify="center" className={classes.avatarContainer}>
            <Avatar alt={`${first_name} ${last_name}`} className={classes.avatar}>
              {getFirstLastNameLetters(first_name, last_name)}
            </Avatar>
            <Typography variant="body1" className={classes.name}>
              {first_name} {last_name}
            </Typography>
          </Grid>
          <Grid className={classes.rowsContainer}>
            <Grid container className={classes.row}>
              <Typography>Hire date</Typography>
              <Typography>{hire_date && format(new Date(hire_date), 'MM/dd/yyyy')}</Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Birth date</Typography>
              <Typography>{birth_date && format(new Date(birth_date), 'MM/dd/yyyy')}</Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Gender</Typography>
              <Typography>{gender?.name}</Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Title</Typography>
              <Typography>{title?.name}</Typography>
            </Grid>
            <Grid container className={classes.row}>
              <Typography>Department</Typography>
              <Typography>{department?.name}</Typography>
            </Grid>

          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Details
