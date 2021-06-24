// deps
import React, { useCallback } from 'react'
// components
// model
import {
  CatalogsAction,
  ActionTypes,
  DepartmentsFetchResponse,
} from '_/model/context/catalogs'
// helpers
import { useFetch } from '_/utils/hooks'
import { queryDepartments } from '_/gql/queries'
import { checkResponse } from '_/utils/auth'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<CatalogsAction>
}

export const useGetDepartments = ({
  dispatch,
}: IUseGetDepartments): [() => void] => {
  const handleFetch = useFetch()
  const handleGetDepartments = useCallback(async () => {
    dispatch({ type: ActionTypes.LOADING, payload: { loading: true } })
    try {
      const res = await handleFetch(queryDepartments())
      checkResponse(res?.status)
      const {
        data: { departments },
      }: DepartmentsFetchResponse = await res.json()
      dispatch({
        type: ActionTypes.DATA,
        payload: { data: { departments } },
        prop: 'departments',
      })
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR, payload: { error } })
    }
    dispatch({ type: ActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetDepartments]
}
