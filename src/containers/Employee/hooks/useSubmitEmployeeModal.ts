// deps
import React from 'react'
// model
import { UpdateEmployeeInput } from '_/model/generated'
import { ActionTypes, EmployeeByIdAction } from '_/model/context/employee'
// helpers
import { useFetch } from '_/utils/hooks'
import { mutationUpdateEmployee } from '_/gql/mutations'
import { checkResponse } from '_/utils/auth'

interface IUseSubmitEmployeeModalProps {
  dispatch: React.Dispatch<EmployeeByIdAction>
}
type SubmitProps = (props: UpdateEmployeeInput, resetForm: () => void) => void

export const useSubmitEmployeeModal = ({
  dispatch,
}: IUseSubmitEmployeeModalProps): [SubmitProps] => {
  const handleFetch = useFetch()

  const handleSubmit = async (
    props: UpdateEmployeeInput,
    resetForm: () => void,
  ): Promise<void> => {
    dispatch({
      type: 'loading',
      payload: { loading: true },
    })
    try {
      const res = await handleFetch(mutationUpdateEmployee(props))
      checkResponse(res?.status)
      resetForm()
      const { id, ...rest } = props
      dispatch({
        type: ActionTypes.UPDATE_ITEM,
        payload: {
          data: rest,
          key: id,
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
  }

  return [handleSubmit]
}
