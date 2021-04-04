// deps
import React from 'react'
// model
import { IQueryProps } from '_/model/common'
// helpers
import { AuthContext } from '_/context/auth'

export const useFetch = () => {
  const { headers, apiUrl } = React.useContext(AuthContext)

  const handleFetch = async ({ query, variables }: IQueryProps) =>
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers,
    })
  return [handleFetch]
}
