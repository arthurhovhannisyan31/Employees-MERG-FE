import { mutationUpdateEmployee } from 'gql/mutations'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import { ActionTypes, EmployeeByIdAction } from 'model/context/employee'
import { UpdateEmployeeInput } from 'model/generated'

interface IUseSubmitEmployeeModalProps {
  dispatch: (val: EmployeeByIdAction) => void
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
          key: id as string,
        },
      })
    } catch (error) {
      dispatch({
        type: 'error',
        payload: { error: error as Error },
      })
    }
    dispatch({
      type: 'loading',
      payload: { loading: false },
    })
  }

  return [handleSubmit]
}
