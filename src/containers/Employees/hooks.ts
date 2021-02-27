// deps
import React from 'react'
// model
import { GetEmployeesInput } from '_/model/generated'
import {
  TEmployeesAction,
  IEmployeesFetchResponse,
} from '_/model/context/employees'
// helpers
import { getEmployees } from '_/gql/queries'
import { SnackbarContext } from '_/context/snackbar'
import { useFetch } from '_/utils/hooks'

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
  const key = React.useMemo(() => `${pageSize}-${currentPage}`, [
    pageSize,
    currentPage,
  ])
  const { setSnackbarState } = React.useContext(SnackbarContext)
  const [handleFetch] = useFetch()
  const handleGetEmployees = React.useCallback(
    async ({ offset, limit }: GetEmployeesInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await handleFetch(getEmployees({ offset, limit }))
        const { data, errors }: IEmployeesFetchResponse = await res.json()
        if (errors?.length) return
        const {
          employees: { nodes, count: quantity },
        } = data
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
    [dispatch, key],
  )
  return [handleGetEmployees]
}
