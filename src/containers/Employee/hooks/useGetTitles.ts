// deps
import React from 'react'
// components
// model
import {
  TCatalogsAction,
  TTitleFetchResponse,
  EActionTypes,
} from '_/model/context/catalogs'
// helpers
import { useFetch } from '_/utils/hooks'
import { queryTitles } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<TCatalogsAction>
}

export const useGetTitles = ({ dispatch }: IUseGetDepartments) => {
  const [handleFetch] = useFetch()
  const handleGetTitles = React.useCallback(async () => {
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
      dispatch({ type: EActionTypes.ERROR, payload: { error } })
    }
    dispatch({ type: EActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetTitles]
}
