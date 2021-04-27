// deps
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { EAuthContextActions } from '_/model/context/auth'
// helpers
import { AuthContext } from '_/context/auth'
import { useFetch } from '_/utils/hooks'
import { logoutQuery } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import storage from '_/utils/storage'

export const useLogout = () => {
  const history = useHistory()
  const { dispatch } = React.useContext(AuthContext)
  const [handleFetch] = useFetch()

  return useCallback(async () => {
    try {
      const res = await handleFetch(logoutQuery())
      fetchResponseCheck(res?.status)
      const result = await res.json()
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
