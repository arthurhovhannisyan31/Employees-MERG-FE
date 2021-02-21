// deps
import React from 'react'
import { useParams } from 'react-router-dom'
// model
import { GetEmployeeInput } from '_/model/generated/graphql'
import {
  TEmployeeByIdAction,
  TEmployeeFetchResponse,
} from '_/model/context/employee'
// helpers
import { getEmployee } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import { useFetch } from '_/utils/hooks'

export interface IUseGetEmployeeProps {
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export const useGetEmployee = ({ dispatch }: IUseGetEmployeeProps) => {
  const { id: idParam } = useParams<Record<'id', string>>()
  const [handleFetch] = useFetch()
  const handleGetEmployee = React.useCallback(
    async ({ id }: GetEmployeeInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await handleFetch(getEmployee({ id }))
        fetchResponseCheck(res?.status)
        const {
          data: { employee },
        }: TEmployeeFetchResponse = await res.json()
        dispatch({
          type: 'data',
          payload: {
            data: employee,
            key: idParam,
          },
        })
      } catch (err) {
        dispatch({
          type: 'error',
          payload: { error: err },
        })
      }
      dispatch({
        type: 'loading',
        payload: { loading: false },
      })
    },
    [dispatch, idParam, handleFetch],
  )
  return [handleGetEmployee]
}
