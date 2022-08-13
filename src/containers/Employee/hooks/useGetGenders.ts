import { useCallback } from 'react'

import { getAction, getCustomAction } from 'context/helpers'
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
    dispatch(getAction(ActionTypes.LOADING, { loading: true }))
    try {
      const res = await handleFetch(queryGenders())
      checkResponse(res?.status)
      const {
        data: { genders },
      }: GendersFetchResponse = await res.json()
      dispatch(
        getCustomAction(
          ActionTypes.DATA,
          {
            data: {
              genders,
            },
          },
          'genders',
        ),
      )
    } catch (error) {
      dispatch(
        getAction(ActionTypes.ERROR, {
          error: error as Error,
        }),
      )
    }
    dispatch(getAction(ActionTypes.LOADING, { loading: false }))
  }, [dispatch, handleFetch])
  return [handleGetGenders]
}
