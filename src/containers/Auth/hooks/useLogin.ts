// deps
import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { AuthReducerAction, AuthContextActions } from '_/model/context/auth'
import { IQueryLoginResponse } from '_/model/queries/auth'
// helpers
import { queryLogin } from '_/gql/queries'
import { useFetch } from '_/hooks'
import { SnackbarContext } from '_/context/snackbar'
import { checkResponse } from '_/utils/auth'

export interface UseLoginProps {
  dispatch: (value: AuthReducerAction) => void
}

export interface UseLoginReturnProps {
  email: string
  password: string
}

export const useLogin = ({
  dispatch,
}: UseLoginProps): ((props: UseLoginReturnProps) => void) => {
  const history = useHistory()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(
    async ({ email, password }) => {
      try {
        const res = await handleFetch(queryLogin({ email, password }))
        checkResponse(res?.status)
        const result: IQueryLoginResponse = await res.json()
        if (result?.data?.login?.userCredentials) {
          const { userCredentials } = result.data.login
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
          payload: { errors: [err] },
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
