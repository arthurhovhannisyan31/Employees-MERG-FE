// deps
import React from 'react'
// model
import {
  TCatalogsAction,
  EActionTypes,
  TGendersFetchResponse,
} from '_/model/context/catalogs'
// helpers
import { useFetch } from '_/utils/hooks'
import { getGenders } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'

export interface IUseGetGenders {
  dispatch: React.Dispatch<TCatalogsAction>
}

export const useGetGenders = ({ dispatch }: IUseGetGenders) => {
  const [handleFetch] = useFetch()
  const handleGetGenders = React.useCallback(async () => {
    dispatch({
      type: EActionTypes.LOADING,
      payload: { loading: true },
    })
    try {
      const res = await handleFetch(getGenders())
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
          error,
        },
      })
    }
    dispatch({
      type: EActionTypes.LOADING,
      payload: { loading: false },
    })
  }, [])
  return [handleGetGenders]
}
