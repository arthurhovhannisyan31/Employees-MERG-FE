import { useCallback, useContext } from 'react'

import { SnackbarContext } from 'context/snackbar'
import { queryForgottenPassword } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import { RootQueryForgottenPasswordArgs } from 'model/generated'

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
