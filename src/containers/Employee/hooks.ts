// deps
import React from 'react'
// model
import { GetEmployeeInput } from '_/model/generated/graphql'
import { TEmployeeFetchResponse } from '_/containers/Employee/types'
import { TEmployeeByIdAction } from '_/model/context/employee'
// helpers
import { getEmployee } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import { useParams } from 'react-router-dom'
import { AuthContext } from '_/context/auth'

interface IUseGetEmployeeProps {
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export const useGetEmployee = ({ dispatch }: IUseGetEmployeeProps) => {
  const { id: idParam } = useParams<Record<'id', string>>()
  const apiUrl = React.useMemo<string>(() => process?.env?.API_URL || '', [])
  const { headers } = React.useContext(AuthContext)

  const handleGetEmployee = React.useCallback(
    async ({ id }: GetEmployeeInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(getEmployee({ id })),
          headers,
        })
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
    [apiUrl, dispatch, headers, idParam],
  )

  return [handleGetEmployee]
}

export const useSubmitEmployeeModal = () => {
  const test = () => {}
  return [test]
}
