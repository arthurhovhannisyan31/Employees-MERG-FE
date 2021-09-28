import React from 'react'

import { updateEmployee } from 'gql/mutations'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import { EActionTypes, TEmployeeByIdAction } from 'model/context/employee'
import { UpdateEmployeeInput } from 'model/generated'

interface IUseSubmitEmployeeModalProps {
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export const useSubmitEmployeeModal = ({
  dispatch,
}: IUseSubmitEmployeeModalProps) => {
  const handleFetch = useFetch()

  const handleSubmit: (
    props: UpdateEmployeeInput,
    resetForm: () => void,
  ) => Promise<void> = async (
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
    } catch (error) {
      dispatch({
        type: 'error',
        payload: { error: error as Record<string, string> },
      })
    }
    dispatch({
      type: 'loading',
      payload: { loading: false },
    })
  }

  return [handleSubmit]
}
