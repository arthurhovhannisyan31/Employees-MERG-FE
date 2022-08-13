import {
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { FC, memo } from 'react'

import Dialog from 'components/UI/Dialog'
import PasswordStrength from 'containers/ChangePassword/components/PasswordStrength'
import useStyles from 'containers/ChangePassword/style'
import { ChangePasswordProps } from 'containers/ChangePassword/types'
const ChangePassword: FC<ChangePasswordProps> = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleClear,
  handleTextField,
  handleKeyDownSubmit,
  handleClickShowPassword,
  disableConfirm,
  handleBlur,
  passwordValidation,
  confirmPasswordValidation,
}) => {
  const classes = useStyles({ hasError: false })

  const passwordsInequality = values.password !== values.confirmPassword
  const disableCancel = !(values.password || values.confirmPassword)

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      data-testid={'change-password'}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        item
        xs={4}
      >
        <Dialog
          confirmLabel="Submit"
          onConfirm={handleSubmit}
          isLoading={false}
          cancelLabel="Clear"
          onCancel={handleClear}
          disableConfirm={disableConfirm}
          disableCancel={disableCancel}
          className={classes.container}
        >
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle1">
                Please type your new password
              </Typography>
            </Grid>
            <Grid item container>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  placeholder={'Please enter password'}
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleTextField('password')}
                  onKeyDown={handleKeyDownSubmit}
                  onBlur={handleBlur}
                  error={!!(errors.password && touched.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{
                    'data-testid': 'change-password-input',
                  }}
                />
              </FormControl>
              <PasswordStrength
                validation={passwordValidation}
                touched={!!touched.password}
              />
            </Grid>
            <Grid item container>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  placeholder={'Please repeat the password'}
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleTextField('confirmPassword')}
                  onKeyDown={handleKeyDownSubmit}
                  onBlur={handleBlur}
                  error={!!(errors.confirmPassword && touched.confirmPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <PasswordStrength
                validation={confirmPasswordValidation}
                touched={!!touched.confirmPassword}
              />
            </Grid>
            {passwordsInequality && (
              <Grid item container>
                <Typography
                  className={classes.passwordsInequality}
                  variant="subtitle2"
                >
                  Passwords are not equal!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default memo(ChangePassword)
