// deps
import React from 'react'
// helpers
import { AuthContext } from '_/context/auth'

export interface IUseFetchProps {
  query: string
  variables?: Record<string, string | number>
}

export const useFetch = () => {
  const apiUrl = React.useMemo<string>(() => process?.env?.API_URL || '', [])
  const { headers } = React.useContext(AuthContext)

  const handleFetch = async ({ query, variables }: IUseFetchProps) =>
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers,
    })
  return [handleFetch]
}
