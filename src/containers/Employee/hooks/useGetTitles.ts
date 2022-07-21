import { useCallback } from 'react'

import { getCustomAction } from 'context/helpers'
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
    dispatch(getCustomAction(ActionTypes.LOADING, { loading: true }))
    try {
      const res = await handleFetch(queryTitles())
      checkResponse(res?.status)
      const {
        data: { titles },
      }: TitleFetchResponse = await res.json()
      dispatch(
        getCustomAction(ActionTypes.DATA, { data: { titles } }, 'titles'),
      )
    } catch (error) {
      dispatch(getCustomAction(ActionTypes.ERROR, { error: error as Error }))
    }
    dispatch(getCustomAction(ActionTypes.LOADING, { loading: false }))
  }, [dispatch, handleFetch])
  return [handleGetTitles]
}
