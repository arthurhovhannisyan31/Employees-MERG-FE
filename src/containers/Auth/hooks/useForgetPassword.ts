// deps
import { useCallback, useContext } from 'react'
// helpers
import { useFetch } from '_/hooks'
import { RootQueryForgotPasswordArgs } from '_/model/generated'
import { queryForgetPassword } from '_/gql/queries'
import { SnackbarContext } from '_/context/snackbar'
import { checkResponse } from '_/utils/auth'

export const useForgetPassword = (): (({
  input,
}: RootQueryForgotPasswordArgs) => void) => {
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(
    async ({ input }) => {
      try {
        const res = await handleFetch(queryForgetPassword({ input }))
        console.log(res)
        checkResponse(res?.status)

        setSnackbarState({
          message: 'Please check your email',
          open: true,
          type: 'info',
        })
      } catch (err) {
        setSnackbarState({
          message: err,
          open: true,
          type: 'error',
        })
      }
    },
    [handleFetch, setSnackbarState],
  )
}
