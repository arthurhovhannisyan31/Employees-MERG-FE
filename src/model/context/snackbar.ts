export type TSnackbarType = 'error' | 'warning' | 'info' | 'success'

export interface ISnackbar {
  open: boolean
  type: TSnackbarType
  message: string
}

export interface ISnackbarContext {
  snackbarState: ISnackbar
  setSnackbarState: (props: Partial<ISnackbar>) => void
}
