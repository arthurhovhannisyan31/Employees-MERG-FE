// deps
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { EAuthContextActions } from '_/model/context/auth'
import { IQueryLogoutResponse } from '_/model/queries/auth'
// helpers
import { AuthContext } from '_/context/auth'
import { useFetch } from '_/utils/hooks'
import { queryLogout } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import storage from '_/utils/storage'

export const useLogout = () => {
  const history = useHistory()
  const { dispatch } = React.useContext(AuthContext)
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
        payload: { errors: [err] },
      })
    }
  }, [dispatch, handleFetch, history])
}
