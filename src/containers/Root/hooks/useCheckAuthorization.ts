// deps
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
// model
import { EAuthContextActions, IAuthReducerAction } from '_/model/context/auth'
import { IQueryMeResponse } from '_/model/queries/auth'
// helpers
import { SnackbarContext } from '_/context'
import { queryMe } from '_/gql/queries'
import { useFetch } from '_/utils/hooks'
import { useLogout } from '_/containers/Auth/hooks/useLogout'

export interface IUseCheckAuthorizationProps {
  dispatch: (value: IAuthReducerAction) => void
}

export const useCheckAuthorization = ({
  dispatch,
}: IUseCheckAuthorizationProps) => {
  const location = useLocation()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()
  const handleLogout = useLogout()

  const handleCheckAuthorization = async () => {
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
        message: err.message,
        open: true,
      })
    }
  }

  return [handleCheckAuthorization]
}
