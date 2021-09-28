import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { SnackbarContext } from 'context/snackbar'
import { queryLogin } from 'gql/queries'
import { useFetch } from 'hooks'
import { checkResponse } from 'utils/auth'

import { AuthReducerAction, AuthContextActions } from 'model/context/auth'
import { UserInput } from 'model/generated'
import { IQueryLoginResponse } from 'model/queries/auth'

export interface UseLoginProps {
  dispatch: (value: AuthReducerAction) => void
}

export const useLogin = ({
  dispatch,
}: UseLoginProps): ((props: UserInput) => void) => {
  const history = useHistory()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(
    async ({ email, password }) => {
      try {
        const res = await handleFetch(
          queryLogin({ input: { email, password } }),
        )
        checkResponse(res?.status)
        const { data }: IQueryLoginResponse = await res.json()
        if (data?.login?.errors) {
          dispatch({
            type: AuthContextActions.ERRORS,
            payload: { errors: data?.login.errors },
          })
        }
        if (data?.login.data) {
          const { userCredentials } = data?.login.data
          dispatch({
            type: AuthContextActions.LOGIN,
            payload: {
              userCredentials,
            },
          })
          setSnackbarState({
            type: 'success',
            message: 'Welcome back!',
            open: true,
          })
          history.push('/')
        }
      } catch (err) {
        dispatch({
          type: AuthContextActions.ERRORS,
          payload: {
            errors: [
              {
                message: (err as Error).message,
                field: (err as Error).message,
              },
            ],
          },
        })
      }
    },
    [dispatch, handleFetch, history, setSnackbarState],
  )
}
