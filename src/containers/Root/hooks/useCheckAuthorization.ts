// deps
import React from 'react'
import { useLocation } from 'react-router-dom'
// model
import { IMeFetchResponse } from '_/containers/Root/types'
// helpers
import { AuthContext, SnackbarContext } from '_/context'
import { getMe } from '_/gql/queries'
import { useLogout } from '_/utils/hooks'

export const useCheckAuthorization = () => {
  const location = useLocation()
  const { headers } = React.useContext(AuthContext)
  const apiUrl = React.useMemo(() => process?.env?.API_URL || '', [])
  const { setSnackbarState } = React.useContext(SnackbarContext)

  const [handleLogout] = useLogout()

  const handleCheckAuthorization = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getMe()),
        headers,
      })
      const { errors }: IMeFetchResponse = await res.json()
      if (
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
