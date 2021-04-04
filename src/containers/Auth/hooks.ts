// deps
import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
// model
import { IAuthReducerAction, EAuthContextActions } from '_/model/context/auth'
// helpers
import { signUp } from '_/gql/mutations'
import { loginQuery } from '_/gql/queries'
import storage from '_/utils/storage'
import { AuthContext } from '_/context'
import { useFetch } from '_/utils/hooks'
import { SnackbarContext } from '_/context/snackbar'

export interface IUseHandleSubmitProps {
  email: string
  password: string
  authState: boolean
  dispatch: (value: IAuthReducerAction) => void
}

export const useHandleSubmit = ({
  email,
  password,
  authState,
  dispatch,
}: IUseHandleSubmitProps) => {
  const history = useHistory()
  const { apiUrl } = useContext(AuthContext)
  const { setSnackbarState } = useContext(SnackbarContext)
  const [handleFetch] = useFetch()

  const handleSubmit = useCallback(async () => {
    const loginBody = loginQuery({ email, password })
    const signupBody = signUp({ email, password })

    try {
      const res = await handleFetch(authState ? signupBody : loginBody)
      if (![200, 201].includes(res?.status)) {
        throw new Error('Failed!')
      }
      const result = await res.json()
      if (result?.data?.login?.token) {
        const {
          token: tokenValue,
          userCredentials,
          tokenExpiration: tokenExpirationValue,
        } = result.data.login
        dispatch({
          type: EAuthContextActions.LOGIN,
          payload: {
            token: tokenValue,
            userCredentials,
          },
        })
        setSnackbarState({
          type: 'success',
          message: 'Hello!',
          open: true,
        })
        storage.set('token', tokenValue)
        storage.set('userCredentials', JSON.stringify(userCredentials))
        storage.set('tokenExpiration', tokenExpirationValue)
        history.push('/')
      }
    } catch (err) {
      dispatch({
        type: EAuthContextActions.ERRORS,
        payload: { errors: [err] },
      })
    }
  }, [authState, apiUrl, dispatch, email, password])
  return [handleSubmit]
}
