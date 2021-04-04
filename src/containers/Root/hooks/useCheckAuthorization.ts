// deps
import React from 'react'
import { useLocation } from 'react-router-dom'
// model
import { IMeFetchResponse } from '_/containers/Root/types'
// helpers
import { SnackbarContext } from '_/context'
import { getMe } from '_/gql/queries'
import { useFetch, useLogout } from '_/utils/hooks'

export const useCheckAuthorization = () => {
  const location = useLocation()
  const { setSnackbarState } = React.useContext(SnackbarContext)
  const [handleFetch] = useFetch()
  const [handleLogout] = useLogout()

  const handleCheckAuthorization = async () => {
    try {
      const res = await handleFetch(getMe())
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
