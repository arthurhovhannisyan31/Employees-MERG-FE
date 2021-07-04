// deps
import React, { useMemo } from 'react'
import cn from 'clsx'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// model
import { ErrorMessagesProps } from '_/containers/Auth/components/ErrorMessages/types'
// helpers
import useStyles from './styles'

const ErrorMessages: React.FC<ErrorMessagesProps> = ({
  authErrors,
  className,
}) => {
  const cls = useStyles()

  const errorMessages = useMemo(
    () =>
      authErrors?.map((err) => (
        <Typography
          key={`${err.name}-${err.message}`}
          className={cls.errorMessage}
        >
          {err.message}
        </Typography>
      )),
    [authErrors, cls.errorMessage],
  )

  return (
    <Grid item className={cn(className)}>
      {errorMessages}
    </Grid>
  )
}

export default ErrorMessages
