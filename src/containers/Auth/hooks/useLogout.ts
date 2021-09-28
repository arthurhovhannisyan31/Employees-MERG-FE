import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from 'context/auth'
import { queryLogout } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'
import storage from 'utils/storage'

import { EAuthContextActions } from 'model/context/auth'
import { IQueryLogoutResponse } from 'model/queries/auth'

export const useLogout = (): (() => Promise<void>) => {
  const history = useHistory()
  const { dispatch } = useContext(AuthContext)
  const handleFetch = useFetch()

  return useCallback(async () => {
    try {
      const res = await handleFetch(queryLogout())
      fetchResponseCheck(res?.status)
      const result: IQueryLogoutResponse = await res.json()
      if (result?.data?.logout) {
        dispatch({
          type: EAuthContextActions.LOGOUT,
        })
        storage.clear()
        history.push('/auth')
      } else {
        dispatch({
          type: EAuthContextActions.ERRORS,
          payload: { errors: [new Error('Logout failed')] },
        })
      }
    } catch (err) {
      dispatch({
        type: EAuthContextActions.ERRORS,
        payload: { errors: [err as Error] },
      })
    }
  }, [dispatch, handleFetch, history])
}
