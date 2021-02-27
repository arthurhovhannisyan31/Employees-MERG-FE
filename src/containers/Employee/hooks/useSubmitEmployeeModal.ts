// deps
import React from 'react'
// model
import { UpdateEmployeeInput } from '_/model/generated'
import { EActionTypes, TEmployeeByIdAction } from '_/model/context/employee'
// helpers
import { useFetch } from '_/utils/hooks'
import { updateEmployee } from '_/gql/mutations'
import { fetchResponseCheck } from '_/utils/auth'

interface IUseSubmitEmployeeModalProps {
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export const useSubmitEmployeeModal = ({
  dispatch,
}: IUseSubmitEmployeeModalProps) => {
  const [handleFetch] = useFetch()

  const handleSubmit = async (
    props: UpdateEmployeeInput,
    resetForm: () => void,
  ) => {
    dispatch({
      type: 'loading',
      payload: { loading: true },
    })
    try {
      const res = await handleFetch(updateEmployee(props))
      fetchResponseCheck(res?.status)
      resetForm()
      const { id, ...rest } = props
      dispatch({
        type: EActionTypes.UPDATE_ITEM,
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
