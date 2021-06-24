import { useCallback } from 'react'

import { queryDepartments } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  CatalogsAction,
  ActionTypes,
  DepartmentsFetchResponse,
} from 'model/context/catalogs'
// helpers
import { useFetch } from 'utils/hooks'
import { queryDepartments } from 'gql/queries'
import { checkResponse } from 'utils/auth'

export interface IUseGetDepartments {
  dispatch: (val: TCatalogsAction) => void
}

export const useGetDepartments = ({ dispatch }: IUseGetDepartments) => {
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
