import { useCallback, useContext } from 'react'

import { SnackbarContext } from 'context/snackbar'
import { queryEmployees } from 'gql/queries'
import { useFetch } from 'hooks'

import {
  ActionTypes,
  IEmployeesFetchResponse,
  TEmployeesAction,
} from 'model/context/employees'

import { GetEmployeesInput } from '../../model/generated'

interface IUseGetEmployees {
  dispatch: (val: TEmployeesAction) => void
}
type GetEmployeesProps = (props: GetEmployeesInput) => void
export const useGetEmployees = ({
  dispatch,
}: IUseGetEmployees): [GetEmployeesProps] => {
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()
  const handleGetEmployees = useCallback(
    async ({ offset, limit }: GetEmployeesInput) => {
      const key = `${limit}-${offset}`

      dispatch({
        type: ActionTypes.LOADING,
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
          type: ActionTypes.DATA,
          payload: {
            data: nodes,
            key,
          },
        })
        dispatch({
          type: ActionTypes.COUNT,
          payload: { count: quantity },
        })
      } catch (err) {
        setSnackbarState({
          type: ActionTypes.ERROR,
          message: (err as Error).message,
          open: true,
        })
        dispatch({
          type: ActionTypes.ERROR,
          payload: { error: err as Error },
        })
      }
      dispatch({
        type: ActionTypes.LOADING,
        payload: { loading: false },
      })
    },
    [dispatch, handleFetch, setSnackbarState],
  )
  return [handleGetEmployees]
}
