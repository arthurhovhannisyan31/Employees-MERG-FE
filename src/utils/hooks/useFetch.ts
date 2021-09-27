import { useContext, useCallback } from 'react'

import { AuthContext } from 'context/auth'

import { IQueryProps } from 'model/common'

export const useFetch = (): (({
  query,
  variables,
}: IQueryProps) => Promise<Response>) => {
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
