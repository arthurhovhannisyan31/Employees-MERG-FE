// deps
import { useContext, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
// model
import { AuthContextActions, AuthReducerAction } from 'model/context/auth'
import { QueryMeResponse } from 'model/queries/auth'
// helpers
import { SnackbarContext } from 'context'
import { queryMe } from 'gql/queries'
import { useFetch } from 'hooks'
import { useLogout } from 'containers/Auth/hooks/useLogout'
import { useIsAuthFreeRoute } from 'containers/Auth/helpers'

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
        dispatch({
          type: AuthContextActions.LOGIN,
          payload: {
            userCredentials: data?.me?.data,
          },
        })
      }
    } catch (err) {
      setSnackbarState({
        type: 'error',
        message: err.message,
        open: true,
      })
    }
  }, [dispatch, handleFetch, handleLogout, location.pathname, setSnackbarState])
}
