// deps
import { useCallback, useContext } from 'react'
// helpers
import { useFetch } from '_/hooks'
import { RootQueryForgottenPasswordArgs } from '_/model/generated'
import { queryForgottenPassword } from '_/gql/queries'
import { SnackbarContext } from '_/context/snackbar'
import { checkResponse } from '_/utils/auth'

export const useForgottenPassword = (): (({
  input,
}: RootQueryForgottenPasswordArgs) => void) => {
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(
    async ({ input }) => {
      try {
        const res = await handleFetch(queryForgottenPassword({ input }))
        checkResponse(res?.status)

        setSnackbarState({
          message: 'Please check your email',
          open: true,
          type: 'info',
        })
      } catch (err) {
        setSnackbarState({
          message: (err as TypeError)?.message,
          open: true,
          type: 'error',
        })
      }
    },
    [handleFetch, setSnackbarState],
  )
}
