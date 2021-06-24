// model
export type SnackbarType = 'error' | 'warning' | 'info' | 'success'

export interface SnackbarProps {
  open: boolean
  type: SnackbarType
  message: string
}

export interface SnackbarContextProps {
  snackbarState: SnackbarProps
  setSnackbarState: (props: Partial<SnackbarProps>) => void
}
