// deps
import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { IAuthReducerAction, EAuthContextActions } from '_/model/context/auth'
import { IQueryLoginResponse } from '_/model/queries/auth'
// helpers
import { signUp } from '_/gql/mutations'
import { queryLogin } from '_/gql/queries'
import { useFetch } from '_/utils/hooks'
import { SnackbarContext } from '_/context/snackbar'
import { fetchResponseCheck } from '_/utils/auth'

export interface IUseLoginProps {
  authState: boolean
  dispatch: (value: IAuthReducerAction) => void
}

export interface IUseLoginReturnProps {
  email: string
  password: string
}

export const useLogin = ({
  authState,
  dispatch,
}: IUseLoginProps): ((props: IUseLoginReturnProps) => void) => {
  const history = useHistory()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(
    async ({ email, password }) => {
      const loginBody = queryLogin({ email, password })
      const signupBody = signUp({ email, password })

      try {
        const res = await handleFetch(authState ? signupBody : loginBody)
        fetchResponseCheck(res?.status)
        const result: IQueryLoginResponse = await res.json()
        if (result?.data?.login?.userCredentials) {
          const { userCredentials } = result.data.login
          dispatch({
            type: EAuthContextActions.LOGIN,
            payload: {
              userCredentials,
            },
          })
          setSnackbarState({
            type: 'success',
            message: 'Hello!',
            open: true,
          })
          history.push('/')
        }
      } catch (err) {
        dispatch({
          type: EAuthContextActions.ERRORS,
          payload: { errors: [err] },
        })
      }
    },
    [handleFetch, authState, dispatch, setSnackbarState, history],
  )
}
