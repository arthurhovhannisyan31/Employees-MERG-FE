// deps
import React from 'react'
// model
import { UpdateEmployeeInput } from 'model/generated'
import { ActionTypes, EmployeeByIdAction } from 'model/context/employee'
// helpers
import { useFetch } from 'hooks'
import { mutationUpdateEmployee } from 'gql/mutations'
import { checkResponse } from 'utils/auth'

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
    } catch (error) {
      dispatch({
        type: 'error',
        payload: { error: error },
      })
    }
    dispatch({
      type: 'loading',
      payload: { loading: false },
    })
  }

  return [handleSubmit]
}
