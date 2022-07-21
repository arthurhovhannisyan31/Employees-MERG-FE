import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { getAction } from 'context/helpers'
import { SnackbarContext } from 'context/snackbar'
import { mutationUpdatePassword } from 'gql/mutations'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import { AuthContextActions, AuthReducerAction } from 'model/context/auth'
import { UpdatePasswordInput } from 'model/generated'
import { MutationUpdatePasswordResponse } from 'model/gql/auth'

export interface useUpdatePasswordProps {
  dispatch: (value: AuthReducerAction) => void
}

export const useUpdatePassword = ({
  dispatch,
}: useUpdatePasswordProps): ((props: UpdatePasswordInput) => Promise<void>) => {
  const history = useHistory()
  const handleFetch = useFetch()
  const { setSnackbarState } = useContext(SnackbarContext)

  return useCallback(
    async ({ password, key }: UpdatePasswordInput) => {
      try {
        const res = await handleFetch(mutationUpdatePassword({ password, key }))
        checkResponse(res?.status)
        const { data }: MutationUpdatePasswordResponse = await res.json()
        if (data?.updatePassword.data) {
          dispatch(
            getAction(AuthContextActions.LOGIN_SUCCESS, {
              userCredentials: data.updatePassword.data,
            }),
          )
          setSnackbarState({
            type: 'success',
            message: 'Password updated!',
            open: true,
          })
        } else {
          setSnackbarState({
            type: 'error',
            message: data?.updatePassword.errors || '',
            open: true,
          })
        }
        history.push('/')
      } catch (err) {
        setSnackbarState({
          type: 'error',
          message: (err as Error).message,
          open: true,
        })
      }
    },
    [dispatch, handleFetch, history, setSnackbarState],
  )
}
