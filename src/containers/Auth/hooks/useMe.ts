import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { useLogout } from 'containers/Auth/hooks/useLogout'
import { SnackbarContext } from 'context'
import { queryMe } from 'gql/queries'
import { useFetch } from 'utils/hooks'

import { IQueryMeResponse } from 'model/queries/auth'

export const useCheckAuthorization = (): [() => Promise<void>] => {
  const location = useLocation()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()
  const handleLogout = useLogout()

  const handleCheckAuthorization = async (): Promise<void> => {
    try {
      const res = await handleFetch(queryMe())
      const { errors }: IQueryMeResponse = await res.json()
      if (
        errors?.some(
          (error: Record<'statusCode', number>) => error.statusCode === 401,
        ) &&
        location.pathname !== '/auth'
      ) {
        handleLogout()
        setSnackbarState({
          type: 'warning',
          message: 'Please login',
          open: true,
        })
      }
    } catch (err) {
      setSnackbarState({
        type: 'error',
        message: (err as Error).message,
        open: true,
      })
    }
  }

  return [handleCheckAuthorization]
}
