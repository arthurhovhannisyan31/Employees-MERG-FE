import { useCallback } from 'react'

import { queryGenders } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  TCatalogsAction,
  EActionTypes,
  TGendersFetchResponse,
} from 'model/context/catalogs'

export interface IUseGetGenders {
  dispatch: (val: TCatalogsAction) => void
}

export const useGetGenders = ({
  dispatch,
}: IUseGetGenders): [() => Promise<void>] => {
  const handleFetch = useFetch()
  const handleGetGenders = useCallback(async () => {
    dispatch({
      type: EActionTypes.LOADING,
      payload: { loading: true },
    })
    try {
      const res = await handleFetch(queryGenders())
      fetchResponseCheck(res?.status)
      const {
        data: { genders },
      }: TGendersFetchResponse = await res.json()
      dispatch({
        type: EActionTypes.DATA,
        payload: {
          data: {
            genders,
          },
        },
        prop: 'genders',
      })
    } catch (error) {
      dispatch({
        type: EActionTypes.ERROR,
        payload: {
          error: error as Record<string, string>,
        },
      })
    }
    dispatch({
      type: EActionTypes.LOADING,
      payload: { loading: false },
    })
  }, [dispatch, handleFetch])
  return [handleGetGenders]
}
