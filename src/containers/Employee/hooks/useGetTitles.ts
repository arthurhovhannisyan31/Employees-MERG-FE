import React, { useCallback } from 'react'

import { queryTitles } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  TCatalogsAction,
  TTitleFetchResponse,
  EActionTypes,
} from 'model/context/catalogs'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<TCatalogsAction>
}

export const useGetTitles = ({
  dispatch,
}: IUseGetDepartments): [() => Promise<void>] => {
  const handleFetch = useFetch()
  const handleGetTitles = useCallback(async () => {
    dispatch({ type: EActionTypes.LOADING, payload: { loading: true } })
    try {
      const res = await handleFetch(queryTitles())
      fetchResponseCheck(res?.status)
      const {
        data: { titles },
      }: TTitleFetchResponse = await res.json()
      dispatch({
        type: EActionTypes.DATA,
        payload: { data: { titles } },
        prop: 'titles',
      })
    } catch (error) {
      dispatch({
        type: EActionTypes.ERROR,
        payload: { error: error as Record<string, string> },
      })
    }
    dispatch({ type: EActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetTitles]
}
