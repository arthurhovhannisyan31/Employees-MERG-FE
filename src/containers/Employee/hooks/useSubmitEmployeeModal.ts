import { getAction } from 'context/helpers'
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
    dispatch(getAction(ActionTypes.LOADING, { loading: true }))
    try {
      const res = await handleFetch(mutationUpdateEmployee(props))
      checkResponse(res?.status)
      resetForm()
      const { id, ...rest } = props
      dispatch(
        getAction(ActionTypes.UPDATE_ITEM, {
          data: rest,
          key: id as string,
        }),
      )
    } catch (error) {
      dispatch(getAction(ActionTypes.ERROR, { error: error as Error }))
    }
    dispatch(getAction(ActionTypes.LOADING, { loading: false }))
  }

  return [handleSubmit]
}
