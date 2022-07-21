import { useCallback } from 'react'

import { getAction, getCustomAction } from 'context/helpers'
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

export const useGetDepartments = ({
  dispatch,
}: IUseGetDepartments): [() => Promise<void>] => {
  const handleFetch = useFetch()
  const handleGetDepartments = useCallback(async () => {
    dispatch(getAction(ActionTypes.LOADING, { loading: true }))
    try {
      const res = await handleFetch(queryDepartments())
      checkResponse(res?.status)
      const {
        data: { departments },
      }: DepartmentsFetchResponse = await res.json()
      dispatch(
        getCustomAction(
          ActionTypes.DATA,
          { data: { departments } },
          'departments',
        ),
      )
    } catch (error) {
      dispatch(getAction(ActionTypes.ERROR, { error: error as Error }))
    }
    dispatch(getAction(ActionTypes.LOADING, { loading: false }))
  }, [dispatch, handleFetch])
  return [handleGetDepartments]
}
