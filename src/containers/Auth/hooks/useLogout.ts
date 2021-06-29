import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { AuthContextActions } from '_/model/context/auth'
import { IQueryLogoutResponse } from '_/model/queries/auth'
// helpers
import { AuthContext } from '_/context/auth'
import { useFetch } from '_/hooks'
import { queryLogout } from '_/gql/queries'
import { checkResponse } from '_/utils/auth'

export const useLogout = (): (() => void) => {
  const history = useHistory()
  const { dispatch } = useContext(AuthContext)
  const handleFetch = useFetch()

  return useCallback(async () => {
    try {
      const res = await handleFetch(queryLogout())
      checkResponse(res?.status)
      const result: IQueryLogoutResponse = await res.json()
      if (result?.data?.logout) {
        dispatch({
          type: AuthContextActions.LOGOUT,
        })
        history.push('/auth')
      } else {
        dispatch({
          type: AuthContextActions.ERRORS,
          payload: { errors: [new Error('Logout failed')] },
        })
      }
    } catch (err) {
      dispatch({
        type: AuthContextActions.ERRORS,
        payload: { errors: [err] },
      })
    }
  }, [dispatch, handleFetch, history])
}
