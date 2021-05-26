// deps
import { useContext, useCallback } from 'react'
// model
import { IQueryProps } from '_/model/common'
// helpers
import { AuthContext } from '_/context/auth'

export const useFetch = () => {
  const { headers, apiUrl } = useContext(AuthContext)
  return useCallback(
    async ({ query, variables }: IQueryProps) =>
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers,
      }),
    [apiUrl, headers],
  )
}
