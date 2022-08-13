import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { getAction } from 'context/helpers'
import { queryEmployee } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import {
  ActionTypes,
  EmployeeByIdAction,
  EmployeeFetchResponse,
} from 'model/context/employee'
import { GetEmployeeInput } from 'model/generated'

export interface IUseGetEmployeeProps {
  dispatch: (val: EmployeeByIdAction) => void
}
type GetEmployeeProps = (props: GetEmployeeInput) => void
export const useGetEmployee = ({
  dispatch,
}: IUseGetEmployeeProps): [GetEmployeeProps] => {
  const { id: idParam } = useParams<Record<'id', string>>()
  const handleFetch = useFetch()
  const handleGetEmployee = useCallback(
    async ({ id }: GetEmployeeInput) => {
      dispatch(getAction(ActionTypes.LOADING, { loading: true }))
      try {
        const res = await handleFetch(queryEmployee({ input: { id } }))
        checkResponse(res?.status)
        const {
          data: { employee },
        }: EmployeeFetchResponse = await res.json()
        dispatch(
          getAction(ActionTypes.ADD_ITEM, {
            data: employee,
            key: idParam,
          }),
        )
      } catch (err) {
        dispatch(getAction(ActionTypes.ERROR, { error: err as Error }))
      }
      dispatch(getAction(ActionTypes.LOADING, { loading: false }))
    },
    [dispatch, idParam, handleFetch],
  )
  return [handleGetEmployee]
}
