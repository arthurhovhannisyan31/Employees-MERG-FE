// deps
import React from 'react'
// model
import { GetEmployeesInput } from '_/model/generated/graphql'
import { TEmployeesFetchResponse } from '_/containers/Employees/types'
import { TEmployeesAction } from '_/model/context/employees'
// helpers
import { getEmployees } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import { AuthContext } from '../../../context/auth-context'
import { SnackbarContext } from '../../../context/snackbar-context'

interface IUseGetEmployees {
  dispatch: React.Dispatch<TEmployeesAction>
  pageSize: number
  currentPage: number
}

export const useGetEmployees = ({
  dispatch,
  currentPage,
  pageSize,
}: IUseGetEmployees) => {
  const { headers } = React.useContext(AuthContext)
  const apiUrl = React.useMemo(() => process?.env?.API_URL || '', [])
  const key = React.useMemo(() => `${pageSize}-${currentPage}`, [
    pageSize,
    currentPage,
  ])
  const { setSnackbarState } = React.useContext(SnackbarContext)
  const handleGetEmployees = React.useCallback(
    async ({ offset, limit }: GetEmployeesInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(getEmployees({ offset, limit })),
          headers,
        })
        fetchResponseCheck(res?.status)
        const {
          data: {
            employees: { nodes, count: quantity },
          },
        }: TEmployeesFetchResponse = await res.json()
        dispatch({
          type: 'data',
          payload: {
            data: nodes,
            key,
          },
        })
        dispatch({
          type: 'count',
          payload: { count: quantity },
        })
      } catch (err) {
        setSnackbarState({
          type: 'error',
          message: err.message,
          open: true,
        })
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
    [apiUrl, dispatch, headers, key],
  )

  return [handleGetEmployees]
}
