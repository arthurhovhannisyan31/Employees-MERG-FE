import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { queryEmployee } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  EActionTypes,
  TEmployeeByIdAction,
  TEmployeeFetchResponse,
} from 'model/context/employee'
import { GetEmployeeInput } from 'model/generated'

export interface IUseGetEmployeeProps {
  dispatch: (val: TEmployeeByIdAction) => void
}

export const useGetEmployee = ({ dispatch }: IUseGetEmployeeProps) => {
  const { id: idParam } = useParams<Record<'id', string>>()
  const handleFetch = useFetch()
  const handleGetEmployee = useCallback(
    async ({ id }: GetEmployeeInput) => {
      dispatch({
        type: EActionTypes.LOADING,
        payload: { loading: true },
      })
      try {
        const res = await handleFetch(queryEmployee({ id }))
        fetchResponseCheck(res?.status)
        const {
          data: { employee },
        }: TEmployeeFetchResponse = await res.json()
        dispatch({
          type: EActionTypes.ADD_ITEM,
          payload: {
            data: employee,
            key: idParam,
          },
        })
      } catch (err) {
        dispatch({
          type: EActionTypes.ERROR,
          payload: { error: err as Record<string, string> },
        })
      }
      dispatch({
        type: EActionTypes.LOADING,
        payload: { loading: false },
      })
    },
    [dispatch, idParam, handleFetch],
  )
  return [handleGetEmployee]
}
