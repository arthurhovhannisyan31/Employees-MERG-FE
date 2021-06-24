import { useCallback } from 'react'

import { queryGenders } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  CatalogsAction,
  ActionTypes,
  GendersFetchResponse,
} from '_/model/context/catalogs'
// helpers
import { useFetch } from '_/utils/hooks'
import { queryGenders } from '_/gql/queries'
import { checkResponse } from '_/utils/auth'

export interface IUseGetGenders {
  dispatch: (val: TCatalogsAction) => void
}

export const useGetGenders = ({ dispatch }: IUseGetGenders): [() => Promise<void>] => {
  const handleFetch = useFetch()
  const handleGetGenders = useCallback(async () => {
    dispatch({
      type: ActionTypes.LOADING,
      payload: { loading: true },
    })
    try {
      const res = await handleFetch(queryGenders())
      checkResponse(res?.status)
      const {
        data: { genders },
      }: GendersFetchResponse = await res.json()
      dispatch({
        type: ActionTypes.DATA,
        payload: {
          data: {
            genders,
          },
        },
        prop: 'genders',
      })
    } catch (error) {
      dispatch({
        type: ActionTypes.ERROR,
        payload: {
          error,
        },
      })
    }
    dispatch({
      type: ActionTypes.LOADING,
      payload: { loading: false },
    })
  }, [dispatch, handleFetch])
  return [handleGetGenders]
}
