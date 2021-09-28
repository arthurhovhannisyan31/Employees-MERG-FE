import { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { SnackbarContext } from 'context/snackbar'
import { signUp } from 'gql/mutations'
import { queryLogin } from 'gql/queries'
import { fetchResponseCheck } from 'utils/auth'
import { useFetch } from 'utils/hooks'

import { IAuthReducerAction, EAuthContextActions } from 'model/context/auth'
import { IQueryLoginResponse } from 'model/queries/auth'

export interface IUseHandleSubmitProps {
  email: string
  password: string
  authState: boolean
  dispatch: (value: IAuthReducerAction) => void
}

export const useLogin = ({
  email,
  password,
  authState,
  dispatch,
}: IUseHandleSubmitProps): (() => Promise<void>) => {
  const history = useHistory()
  const { setSnackbarState } = useContext(SnackbarContext)
  const handleFetch = useFetch()

  return useCallback(async () => {
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
        payload: { errors: [err as Error] },
      })
    }
  }, [
    email,
    password,
    handleFetch,
    authState,
    dispatch,
    setSnackbarState,
    history,
  ])
}
