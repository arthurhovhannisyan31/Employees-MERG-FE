// deps
import React from 'react'
import { useParams } from 'react-router-dom'
// model
import { GetEmployeeInput } from '_/model/generated'
import {
  EActionTypes,
  TEmployeeByIdAction,
  TEmployeeFetchResponse,
} from '_/model/context/employee'
// helpers
import { queryEmployee } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import { useFetch } from '_/utils/hooks'

export interface IUseGetEmployeeProps {
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export const useGetEmployee = ({ dispatch }: IUseGetEmployeeProps) => {
  const { id: idParam } = useParams<Record<'id', string>>()
  const handleFetch = useFetch()
  const handleGetEmployee = React.useCallback(
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
          payload: { error: err },
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
