import { ChangePasswordProps } from 'containers/ChangePassword/types'

const passwordValidationStub = {
  allValid: false,
  hasDigits: false,
  hasLowercase: false,
  hasSpecial: false,
  hasUppercase: false,
  hasValidLength: false,
}

export const changePasswordProps: ChangePasswordProps = {
  values: {
    password: '',
    confirmPassword: '',
    showPassword: false,
  },
  errors: {},
  touched: {
    showPassword: false,
    confirmPassword: false,
    password: false,
  },
  handleSubmit: () => null,
  handleClear: () => null,
  handleTextField: () => () => null,
  handleKeyDownSubmit: () => null,
  handleClickShowPassword: () => null,
  disableConfirm: false,
  handleBlur: () => null,
  passwordValidation: passwordValidationStub,
  confirmPasswordValidation: passwordValidationStub,
}
