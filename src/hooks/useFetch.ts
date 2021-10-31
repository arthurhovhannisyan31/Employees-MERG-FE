import { useContext, useCallback } from 'react'

import { AuthContext } from 'context/auth'

import { QueryProps } from 'model/common'

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
