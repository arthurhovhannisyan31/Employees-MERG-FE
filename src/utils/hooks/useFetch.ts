// deps
import { useContext, useCallback } from 'react'
// model
import { QueryProps } from 'model/common'
// helpers
import { AuthContext } from 'context/auth'

export const useFetch = (): ((props: QueryProps) => Promise<Response>) => {
  const { headers, apiUrl } = useContext(AuthContext)
  return useCallback(
    async ({ query, variables }: QueryProps) =>
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers,
      }),
    [apiUrl, headers],
  )
}
