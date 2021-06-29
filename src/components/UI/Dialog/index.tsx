import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, { FC } from 'react'

import useStyles from './style'

interface IDialogProps {
  title?: string
  onConfirm?: () => void
  confirmLabel?: string
  onCancel?: () => void
  cancelLabel?: string
  disableConfirm?: boolean
  disableCancel?: boolean
  isLoading?: boolean
}

const Dialog: FC<IDialogProps> = ({
  onConfirm,
  confirmLabel = 'Confirm',
  onCancel,
  cancelLabel = 'Cancel',
  title,
  children,
  disableConfirm,
  disableCancel,
  isLoading,
}) => {
  const cls = useStyles()

  return (
    <Grid container className={cls.container}>
      <Paper className={cls.paper}>
        <Grid container direction="column">
          {title && (
            <header className={cls.header}>
              <Typography align="center" variant="body2">
                {title}
              </Typography>
            </header>
          )}
          <section className={cls.content}>{children}</section>
          <section className={cls.actions}>
            <Grid container justify="flex-end" alignItems="center">
              {onCancel && cancelLabel && (
                <Button
                  onClick={onCancel}
                  className={cls.controls}
                  disabled={disableCancel}
                >
                  {cancelLabel}
                </Button>
              )}
              {onConfirm && confirmLabel && (
                <Button
                  onClick={onConfirm}
                  className={cls.controls}
                  disabled={disableConfirm}
                >
                  {confirmLabel}
                  {isLoading && (
                    <span className={cls.circularProgress}>
                      <CircularProgress size={16} color="secondary" />
                    </span>
                  )}
                </Button>
              )}
            </Grid>
          </section>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Dialog
