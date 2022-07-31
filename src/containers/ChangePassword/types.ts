import { FormikErrors, FormikTouched } from 'formik'
import { ChangeEvent, FormEvent, KeyboardEvent, FocusEvent } from 'react'

import { PassportStrengthValidation } from 'containers/ChangePassword/components/PasswordStrength/types'

export interface ChangePasswordState {
  password: string
  confirmPassword: string
  showPassword: boolean
}
export interface ChangePasswordProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void
  handleClear: () => void
  handleTextField: (
    field: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleKeyDownSubmit: (event: KeyboardEvent) => void
  handleClickShowPassword: () => void
  handleBlur: (e: FocusEvent<any>) => void
  disableConfirm: boolean
  values: ChangePasswordState
  errors: FormikErrors<ChangePasswordState>
  touched: FormikTouched<ChangePasswordState>
  passwordValidation: PassportStrengthValidation
  confirmPasswordValidation: PassportStrengthValidation
}
