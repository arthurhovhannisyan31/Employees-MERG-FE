// deps
import React from 'react'
import { useHistory } from 'react-router-dom'
// model
import { EAuthContextActions } from '_/model/context/auth'
// helpers
import storage from '_/utils/storage'
import { AuthContext } from '_/context/auth-context'

export const useLogout = () => {
  const history = useHistory()
  const { dispatch } = React.useContext(AuthContext)

  const handleLogout = () => {
    dispatch({
      type: EAuthContextActions.LOGOUT,
    })
    storage.clear()
    history.push('/auth')
  }
  return [handleLogout]
}
