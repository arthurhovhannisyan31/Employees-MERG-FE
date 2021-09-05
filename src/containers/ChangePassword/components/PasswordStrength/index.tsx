// deps
import React from 'react'
import { Grid, Typography, Tooltip } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import cn from 'clsx'
// model
import { PasswordStrengthProps } from '_/containers/ChangePassword/components/PasswordStrength/types'
// helpers
import useStyles from './styles'

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  validation: {
    hasDigits,
    hasLowercase,
    hasSpecial,
    hasUppercase,
    hasValidLength,
  },
  touched,
}) => {
  const classes = useStyles({ hasError: false })
  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item>
        <Tooltip title="Uppercase characters A-Z">
          <Grid container>
            <CheckIcon
              className={cn(
                classes.checkIcon,
                hasUppercase && classes.checkIconVisible,
              )}
            />
            <Typography
              className={cn(
                touched && classes.checkLabelError,
                hasUppercase && classes.checkLabelSuccess,
              )}
              variant="caption"
            >
              A-Z
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Lowercase characters a-z">
          <Grid container>
            <CheckIcon
              className={cn(
                classes.checkIcon,
                hasLowercase && classes.checkIconVisible,
              )}
            />
            <Typography
              className={cn(
                touched && classes.checkLabelError,
                hasLowercase && classes.checkLabelSuccess,
              )}
              variant="caption"
            >
              a-z
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Digits 0-9">
          <Grid container>
            <CheckIcon
              className={cn(
                classes.checkIcon,
                hasDigits && classes.checkIconVisible,
              )}
            />
            <Typography
              className={cn(
                touched && classes.checkLabelError,
                hasDigits && classes.checkLabelSuccess,
              )}
              variant="caption"
            >
              0-9
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Special characters (!, $, #, %, etc.)">
          <Grid container>
            <CheckIcon
              className={cn(
                classes.checkIcon,
                hasSpecial && classes.checkIconVisible,
              )}
            />
            <Typography
              className={cn(
                touched && classes.checkLabelError,
                hasSpecial && classes.checkLabelSuccess,
              )}
              variant="caption"
            >
              !,$,#,%
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Password must be eight or more characters long.">
          <Grid container>
            <CheckIcon
              className={cn(
                classes.checkIcon,
                hasValidLength && classes.checkIconVisible,
              )}
            />
            <Typography
              className={cn(
                touched && classes.checkLabelError,
                hasValidLength && classes.checkLabelSuccess,
              )}
              variant="caption"
            >
              8 char
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default PasswordStrength
