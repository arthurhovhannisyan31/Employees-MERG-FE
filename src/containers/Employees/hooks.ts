import { useContext, useCallback, useMemo, Dispatch } from 'react'

import { SnackbarContext } from 'context/snackbar'
import { queryEmployees } from 'gql/queries'
import { useFetch } from 'utils/hooks'

import {
  TEmployeesAction,
  IEmployeesFetchResponse,
} from '_/model/context/employees'
// helpers
import { queryEmployees } from '_/gql/queries'
import { SnackbarContext } from '_/context/snackbar'
import { useFetch } from '_/hooks'

interface IUseGetEmployees {
  dispatch: (val: TEmployeesAction) => void
  pageSize: number
  currentPage: number
}
type GetEmployeesProps = (props: GetEmployeesInput) => void
export const useGetEmployees = ({
  dispatch,
  currentPage,
  pageSize,
}: IUseGetEmployees): [GetEmployeesProps] => {
  const key = useMemo(
    () => `${pageSize}-${currentPage}`,
    [pageSize, currentPage],
  )
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()
  const handleGetEmployees = useCallback(
    async ({ offset, limit }: GetEmployeesInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await handleFetch(
          queryEmployees({ input: { offset, limit } }),
        )
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
    [dispatch, key, handleFetch, setSnackbarState],
  )
  return [handleGetEmployees]
}
