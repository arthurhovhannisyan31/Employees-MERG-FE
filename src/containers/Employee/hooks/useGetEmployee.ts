// deps
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
// model
import { GetEmployeeInput } from '_/model/generated'
import {
  ActionTypes,
  EmployeeByIdAction,
  EmployeeFetchResponse,
} from '_/model/context/employee'
// helpers
import { queryEmployee } from '_/gql/queries'
import { checkResponse } from '_/utils/auth'
import { useFetch } from '_/hooks'

export interface IUseGetEmployeeProps {
  dispatch: React.Dispatch<EmployeeByIdAction>
}
type GetEmployeeProps = (props: GetEmployeeInput) => void
export const useGetEmployee = ({
  dispatch,
}: IUseGetEmployeeProps): [GetEmployeeProps] => {
  const { id: idParam } = useParams<Record<'id', string>>()
  const handleFetch = useFetch()
  const handleGetEmployee = useCallback(
    async ({ id }: GetEmployeeInput) => {
      dispatch({
        type: ActionTypes.LOADING,
        payload: { loading: true },
      })
      try {
        const res = await handleFetch(queryEmployee({ input: { id } }))
        checkResponse(res?.status)
        const {
          data: { employee },
        }: EmployeeFetchResponse = await res.json()
        dispatch({
          type: ActionTypes.ADD_ITEM,
          payload: {
            data: employee,
            key: idParam,
          },
        })
      } catch (err) {
        dispatch({
          type: ActionTypes.ERROR,
          payload: { error: err },
        })
      }
      dispatch({
        type: ActionTypes.LOADING,
        payload: { loading: false },
      })
    },
    [dispatch, idParam, handleFetch],
  )
  return [handleGetEmployee]
}
