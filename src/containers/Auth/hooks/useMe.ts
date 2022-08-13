import { useContext, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { useIsAuthFreeRoute } from 'containers/Auth/hooks/useIsAuthRoute'
import { useLogout } from 'containers/Auth/hooks/useLogout'
import { SnackbarContext } from 'context'
import { getAction } from 'context/helpers'
import { queryMe } from 'gql/queries'
import { useFetch } from 'hooks'

import { AuthContextActions, AuthReducerAction } from 'model/context/auth'
import { QueryMeResponse } from 'model/gql/auth'

export interface IUseCheckAuthorizationProps {
  dispatch: (value: AuthReducerAction) => void
}

export const useMe = ({
  dispatch,
}: IUseCheckAuthorizationProps): (() => void) => {
  const location = useLocation()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()
  const handleLogout = useLogout()
  const isAuthFreeRoute = useIsAuthFreeRoute(location.pathname)

  return useCallback(async () => {
    try {
      const res = await handleFetch(queryMe())
      const { data }: QueryMeResponse = await res.json()

      if (!data?.me?.data && !isAuthFreeRoute) {
        handleLogout()
        setSnackbarState({
          type: 'warning',
          message: 'Please login',
          open: true,
        })
      }
      if (data?.me?.data) {
        dispatch(
          getAction(AuthContextActions.LOGIN_SUCCESS, {
            userCredentials: data?.me?.data,
          }),
        )
      }
    } catch (err) {
      setSnackbarState({
        type: 'error',
        message: (err as Error).message,
        open: true,
      })
    }
  }, [dispatch, handleFetch, handleLogout, isAuthFreeRoute, setSnackbarState])
}
