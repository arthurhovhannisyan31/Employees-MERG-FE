import { useCallback } from 'react'

import { queryTitles } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import {
  CatalogsAction,
  TitleFetchResponse,
  ActionTypes,
} from 'model/context/catalogs'

export interface IUseGetDepartments {
  dispatch: (val: CatalogsAction) => void
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
      dispatch({ type: ActionTypes.ERROR, payload: { error: error as Error } })
    }
    dispatch({ type: ActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetTitles]
}
