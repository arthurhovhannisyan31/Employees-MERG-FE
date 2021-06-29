import React, { useCallback } from 'react'

import { queryTitles } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  CatalogsAction,
  TitleFetchResponse,
  ActionTypes,
} from 'model/context/catalogs'
// helpers
import { useFetch } from 'hooks'
import { queryTitles } from 'gql/queries'
import { checkResponse } from 'utils/auth'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<CatalogsAction>
}

export const useGetTitles = ({
  dispatch,
}: IUseGetDepartments): [() => Promise<void>] => {
  const handleFetch = useFetch()
  const handleGetTitles = useCallback(async () => {
    dispatch({ type: ActionTypes.LOADING, payload: { loading: true } })
    try {
      const res = await handleFetch(queryTitles())
      checkResponse(res?.status)
      const {
        data: { titles },
      }: TitleFetchResponse = await res.json()
      dispatch({
        type: ActionTypes.DATA,
        payload: { data: { titles } },
        prop: 'titles',
      })
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR, payload: { error } })
    }
    dispatch({ type: ActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetTitles]
}
