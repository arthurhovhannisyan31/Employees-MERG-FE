// deps
import React, { useCallback } from 'react'
// components
// model
import {
  CatalogsAction,
  TitleFetchResponse,
  ActionTypes,
} from '_/model/context/catalogs'
// helpers
import { useFetch } from '_/utils/hooks'
import { queryTitles } from '_/gql/queries'
import { checkResponse } from '_/utils/auth'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<CatalogsAction>
}

export const useGetTitles = ({
  dispatch,
}: IUseGetDepartments): [() => void] => {
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
