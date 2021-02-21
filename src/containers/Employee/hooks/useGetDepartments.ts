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
import { getDepartments } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'

export interface IUseGetDepartments {
  dispatch: React.Dispatch<TCatalogsAction>
}

export const useGetDepartments = ({ dispatch }: IUseGetDepartments) => {
  const [handleFetch] = useFetch()
  const handleGetDepartments = React.useCallback(async () => {
    dispatch({ type: EActionTypes.LOADING, payload: { loading: true } })
    try {
      const res = await handleFetch(getDepartments())
      fetchResponseCheck(res?.status)
      const props: TDepartmentsFetchResponse = await res.json()
      console.log(props)
    } catch (error) {
      dispatch({ type: EActionTypes.ERROR, payload: { error } })
    }
    dispatch({ type: EActionTypes.LOADING, payload: { loading: false } })
  }, [])
  return [handleGetDepartments]
}
