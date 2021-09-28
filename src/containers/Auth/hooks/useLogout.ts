import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from 'context/auth'
import { queryLogout } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import { AuthContextActions } from 'model/context/auth'
import { IQueryLogoutResponse } from 'model/queries/auth'

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
          payload: { errors: [{ field: 'logout', message: 'Logout failed' }] },
        })
      }
    } catch (err) {
      dispatch({
        type: AuthContextActions.ERRORS,
        payload: {
          errors: [
            {
              message: (err as Error).message,
              field: (err as Error).message,
            },
          ],
        },
      })
    }
  }, [dispatch, handleFetch, history])
}
