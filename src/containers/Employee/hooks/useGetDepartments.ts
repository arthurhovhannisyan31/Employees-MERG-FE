// deps
import React from 'react'
// components
// model
import {
  TCatalogsAction,
  EActionTypes,
  TDepartmentsFetchResponse,
} from '_/model/context/catalogs'
// helpers
import { useFetch } from '_/utils/hooks'
import { queryDepartments } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<TCatalogsAction>
}

export const useGetDepartments = ({ dispatch }: IUseGetDepartments) => {
  const [handleFetch] = useFetch()
  const handleGetDepartments = React.useCallback(async () => {
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
      dispatch({ type: EActionTypes.ERROR, payload: { error } })
    }
    dispatch({ type: EActionTypes.LOADING, payload: { loading: false } })
  }, [handleFetch])
  return [handleGetDepartments]
}
