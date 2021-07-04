// deps
import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { AuthReducerAction, AuthContextActions } from '_/model/context/auth'
import { IQueryLoginResponse } from '_/model/queries/auth'
import { UserInput } from '_/model/generated'
// helpers
import { queryLogin } from '_/gql/queries'
import { useFetch } from '_/hooks'
import { SnackbarContext } from '_/context/snackbar'
import { checkResponse } from '_/utils/auth'

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
        const res = await handleFetch(queryLogin({ email, password }))
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
          payload: { errors: [{ message: err.message, field: err.message }] },
        })
      }
    },
    [      email,
      password,
      handleFetch,
      authState,
      dispatch,
      setSnackbarState,
      history,],
  )
}
