import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { queryEmployee } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import {
  ActionTypes,
  EmployeeByIdAction,
  EmployeeFetchResponse,
} from 'model/context/employee'
// helpers
import { queryEmployee } from 'gql/queries'
import { checkResponse } from 'utils/auth'
import { useFetch } from 'hooks'

export interface IUseGetEmployeeProps {
  dispatch: (val: TEmployeeByIdAction) => void
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
        const res = await handleFetch(queryEmployee({ id }))
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
