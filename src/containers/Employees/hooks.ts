import { useCallback, useContext } from 'react'

import { getAction } from 'context/helpers'
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

      dispatch(getAction(ActionTypes.LOADING, { loading: true }))
      try {
        const res = await handleFetch(
          queryEmployees({ input: { offset, limit } }),
        )
        const { data, errors }: IEmployeesFetchResponse = await res.json()
        if (errors?.length) return
        const {
          employees: { nodes, count: quantity },
        } = data
        dispatch(
          getAction(ActionTypes.DATA, {
            data: nodes,
            key,
          }),
        )
        dispatch(getAction(ActionTypes.COUNT, { count: quantity }))
      } catch (err) {
        setSnackbarState({
          type: ActionTypes.ERROR,
          message: (err as Error).message,
          open: true,
        })
        dispatch(getAction(ActionTypes.ERROR, { error: err as Error }))
      }
      dispatch(getAction(ActionTypes.LOADING, { loading: false }))
    },
    [dispatch, handleFetch, setSnackbarState],
  )
  return [handleGetEmployees]
}
