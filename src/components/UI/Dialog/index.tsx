// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
// components
// helpers
import useStyles from './style'

interface IDialogProps {
  title?: string
  onCancel?: () => void
  onConfirm?: () => void
  confirmLabel?: string
  disableConfirm?: boolean
  isLoading?: boolean
}

const Dialog: React.FC<IDialogProps> = ({
  title,
  children,
  confirmLabel,
  disableConfirm,
  isLoading,
  onCancel,
  onConfirm,
}) => {
  const cls = useStyles()

  return (
    <>
      <Paper className={cls.container}>
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
              {onCancel && (
                <Button onClick={onCancel} className={cls.controls}>
                  Cancel
                </Button>
              )}
              {onConfirm && (
                <Button
                  onClick={onConfirm}
                  className={cls.controls}
                  disabled={disableConfirm}
                >
                  {confirmLabel}
                  {isLoading && (
                    <CircularProgress
                      size={15}
                      className={cls.circularProgress}
                    />
                  )}
                </Button>
              )}
            </Grid>
          </section>
        </Grid>
      </Paper>
    </>
  )
}

export default Dialog
