import { useCallback } from 'react'

import { queryDepartments } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  TCatalogsAction,
  EActionTypes,
  TDepartmentsFetchResponse,
} from 'model/context/catalogs'

export interface IUseGetDepartments {
  dispatch: (val: TCatalogsAction) => void
}

export const useGetDepartments = ({
  dispatch,
}: IUseGetDepartments): [() => Promise<void>] => {
  const handleFetch = useFetch()
  const handleGetDepartments = useCallback(async () => {
    dispatch({ type: EActionTypes.LOADING, payload: { loading: true } })
    try {
      const res = await handleFetch(queryDepartments())
      fetchResponseCheck(res?.status)
      const {
        data: { departments },
      }: TDepartmentsFetchResponse = await res.json()
      dispatch({
        type: EActionTypes.DATA,
        payload: { data: { departments } },
        prop: 'departments',
      })
    } catch (error) {
      dispatch({
        type: EActionTypes.ERROR,
        payload: { error: error as Record<string, string> },
      })
    }
    dispatch({ type: EActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetDepartments]
}
