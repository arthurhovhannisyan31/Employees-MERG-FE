import { useFormik } from 'formik'
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useParams } from 'react-router-dom'

import { useUpdatePassword } from 'containers/Auth/hooks/useUpdatePassword'
import ChangePassword from 'containers/ChangePassword/ChangePassword'
import { PassportStrengthValidation } from 'containers/ChangePassword/components/PasswordStrength/types'
import { ChangePasswordState } from 'containers/ChangePassword/types'
import { AuthContext } from 'context/auth'
import { handleEnterKeyDown } from 'utils/keyboard'

import { getPasswordStrength, initState } from './helpers'

const ChangePasswordContainer: FC = () => {
  const { dispatch } = useContext(AuthContext)
  const { id: key } = useParams<Record<'id', string>>()
  const handleUpdatePassword = useUpdatePassword({ dispatch })

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initState,
    onSubmit: ({ password }: ChangePasswordState) => {
      handleUpdatePassword({ password, key })
    },
  })

  const passwordValidation = useMemo<PassportStrengthValidation>(
    () => getPasswordStrength(values.password),
    [values.password],
  )
  const confirmPasswordValidation = useMemo<PassportStrengthValidation>(
    () => getPasswordStrength(values.confirmPassword),
    [values.confirmPassword],
  )

  const handleClear = useCallback(() => resetForm(), [resetForm])

  const handleTextField = useCallback(
    (field: string) =>
      (event: ChangeEvent<HTMLInputElement>): void => {
        setFieldValue(field, event.target.value)
      },
    [setFieldValue],
  )

  const disableConfirm = useMemo<boolean>(
    () =>
      !(
        values.password === values.confirmPassword &&
        passwordValidation.allValid &&
        confirmPasswordValidation.allValid
      ),
    [
      values.password,
      values.confirmPassword,
      passwordValidation,
      confirmPasswordValidation,
    ],
  )

  const handleKeyDownSubmit = useCallback(
    (event: KeyboardEvent) => {
      if (!disableConfirm) {
        handleEnterKeyDown(handleSubmit)(event)
      }
    },
    [disableConfirm, handleSubmit],
  )

  const handleClickShowPassword = useCallback(() => {
    setFieldValue('showPassword', !values.showPassword)
  }, [setFieldValue, values])

  // TODO make request to check if link is expired
  // if so show notification of expired link and redirect to home
  const handleCheckRestoreLink = useCallback(() => {
    // request
  }, [])

  useEffect(handleCheckRestoreLink, [handleCheckRestoreLink])

  return (
    <ChangePassword
      handleSubmit={handleSubmit}
      handleClear={handleClear}
      handleClickShowPassword={handleClickShowPassword}
      handleKeyDownSubmit={handleKeyDownSubmit}
      handleTextField={handleTextField}
      errors={errors}
      values={values}
      disableConfirm={disableConfirm}
      handleBlur={handleBlur}
      touched={touched}
      passwordValidation={passwordValidation}
      confirmPasswordValidation={confirmPasswordValidation}
    />
  )
}

export default ChangePasswordContainer
