import { useContext, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { useLogout } from 'containers/Auth/hooks/useLogout'
import { SnackbarContext } from 'context'
import { queryMe } from 'gql/queries'
import { useFetch } from 'utils/hooks'

import { EAuthContextActions, IAuthReducerAction } from 'model/context/auth'
import { IQueryMeResponse } from 'model/queries/auth'

export interface IUseCheckAuthorizationProps {
  dispatch: (value: IAuthReducerAction) => void
}

export const useCheckAuthorization = ({
  dispatch,
}: IUseCheckAuthorizationProps): (() => Promise<void>) => {
  const location = useLocation()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()
  const handleLogout = useLogout()

  return useCallback(async () => {
    try {
      const res = await handleFetch(queryMe())
      const { errors, data }: IQueryMeResponse = await res.json()
      if (data?.me) {
        dispatch({
          type: EAuthContextActions.LOGIN,
          payload: {
            userCredentials: data.me,
          },
        })
      } else if (
        errors?.some((error) => error.statusCode === 401) &&
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
  }, [dispatch, handleFetch, handleLogout, location.pathname, setSnackbarState])
}
