// deps
import { useContext, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
// model
import { AuthContextActions, AuthReducerAction } from '_/model/context/auth'
import { IQueryMeResponse } from '_/model/queries/auth'
// helpers
import { SnackbarContext } from '_/context'
import { queryMe } from '_/gql/queries'
import { useFetch } from '_/hooks'
import { useLogout } from '_/containers/Auth/hooks/useLogout'

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

  return useCallback(async () => {
    try {
      const res = await handleFetch(queryMe())
      const { data }: IQueryMeResponse = await res.json()
      if (!data?.me?.data && location.pathname !== '/auth') {
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
