import { useCallback } from 'react'

import { queryGenders } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import {
  ActionTypes,
  CatalogsAction,
  GendersFetchResponse,
} from 'model/context/catalogs'

export interface IUseGetGenders {
  dispatch: (val: CatalogsAction) => void
}

export const useGetGenders = ({
  dispatch,
}: IUseGetGenders): [() => Promise<void>] => {
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
          error: error as Error,
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
