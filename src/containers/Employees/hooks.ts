import { useContext, useCallback, useMemo } from 'react'

import { SnackbarContext } from 'context/snackbar'
import { queryEmployees } from 'gql/queries'
import { useFetch } from 'hooks'

import {
  TEmployeesAction,
  IEmployeesFetchResponse,
} from 'model/context/employees'

import { GetEmployeesInput } from '../../model/generated'

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
          message: (err as Error).message,
          open: true,
        })
        dispatch({
          type: 'error',
          payload: { error: err as Error },
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
