// deps
import React from 'react'
// model
import { IEmployeeModalProps } from '_/containers/Employee/components/DetailsModal/types'
import { FormikState } from 'formik'
import { TEmployeeByIdAction } from '_/model/context/employee'
// helpers
import { useFetch } from '_/utils/hooks'

interface IUseSubmitEmployeeModalProps {
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export const useSubmitEmployeeModal = ({
  dispatch,
}: IUseSubmitEmployeeModalProps) => {
  const [handleFetch] = useFetch()

  const handleSubmit = async (
    props: IEmployeeModalProps,
    resetForm: (
      nextState?: Partial<FormikState<IEmployeeModalProps>> | undefined,
    ) => void,
  ) => {
    dispatch({
      type: 'loading',
      payload: { loading: true },
    })
    try {
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
    console.log(props)
    console.log(resetForm)
  }

  return [handleSubmit]
}
