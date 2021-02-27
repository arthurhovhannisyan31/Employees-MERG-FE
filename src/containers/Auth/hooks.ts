// deps
import React from 'react'
import { useHistory } from 'react-router-dom'
// model
import { IAuthReducerAction, EAuthContextActions } from '_/model/context/auth'
// helpers
import { signUp } from '_/gql/mutations'
import { loginQuery } from '_/gql/queries'
import storage from '_/utils/storage'
import { SnackbarContext } from '../../context/snackbar'

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
  const apiUrl = process?.env?.API_URL || ''
  const history = useHistory()
  const { setSnackbarState } = React.useContext(SnackbarContext)

  const handleSubmit = React.useCallback(async () => {
    const loginBody = loginQuery({ email, password })
    const signupBody = signUp({ email, password })

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(authState ? signupBody : loginBody),
        headers: { 'Content-Type': 'application/json' },
      })
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
