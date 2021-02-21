// deps
import React from 'react'
// model
import { IQueryProps } from '_/model/common'
// helpers
import { AuthContext } from '_/context/auth'

export const useFetch = () => {
  const apiUrl = React.useMemo<string>(() => process?.env?.API_URL || '', [])
  const { headers } = React.useContext(AuthContext)

  const handleFetch = async ({ query, variables }: IQueryProps) =>
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers,
    })
  return [handleFetch]
}
