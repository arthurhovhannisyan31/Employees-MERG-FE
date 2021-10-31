import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { SnackbarContext } from 'context'
import { mutationCreateUser } from 'gql/mutations'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import { AuthContextActions, AuthReducerAction } from 'model/context/auth'
import { CreateUserInput } from 'model/generated'
import { MutationCreateUserResponse } from 'model/gql/auth'

interface UseCreateUserProps {
  dispatch: (value: AuthReducerAction) => void
}

export const useCreateUser = ({
  dispatch,
}: UseCreateUserProps): ((input: CreateUserInput) => void) => {
  const history = useHistory()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(
    async (input) => {
      try {
        const res = await handleFetch(mutationCreateUser({ input }))
        checkResponse(res?.status)
        const { data }: MutationCreateUserResponse = await res.json()
        if (data?.createUser.errors) {
          dispatch({
            type: AuthContextActions.ERRORS,
            payload: { errors: data?.createUser.errors },
          })
        }
        if (data?.createUser.data) {
          const { email, _id, name } = data?.createUser.data
          dispatch({
            type: AuthContextActions.LOGIN_SUCCESS,
            payload: {
              userCredentials: {
                _id,
                email,
                name,
              },
            },
          })
          setSnackbarState({
            type: 'success',
            message: 'Welcome!',
            open: true,
          })
          history.push('/')
        }
      } catch (err) {
        setSnackbarState({
          message: (err as TypeError)?.message,
          open: true,
          type: 'error',
        })
      }
    },
    [dispatch, handleFetch, history, setSnackbarState],
  )
}
