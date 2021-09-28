import { useCallback } from 'react'

import { queryDepartments } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import {
  CatalogsAction,
  ActionTypes,
  DepartmentsFetchResponse,
} from 'model/context/catalogs'

export interface IUseGetDepartments {
  dispatch: (val: CatalogsAction) => void
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
      dispatch({ type: ActionTypes.ERROR, payload: { error: error as Error } })
    }
    dispatch({ type: ActionTypes.LOADING, payload: { loading: false } })
  }, [dispatch, handleFetch])
  return [handleGetDepartments]
}
