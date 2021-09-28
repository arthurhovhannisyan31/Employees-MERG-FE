// model
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'constants/common'
import { PassportStrengthValidation } from 'containers/ChangePassword/components/PasswordStrength/types'
import { ChangePasswordState } from 'containers/ChangePassword/types'
// helpers

export const initState: ChangePasswordState = {
  password: '',
  confirmPassword: '',
  showPassword: false,
}

export const getPasswordStrength = (
  password: string,
): PassportStrengthValidation => ({
  hasDigits: /\d/g.test(password),
  hasLowercase: /[a-z]/g.test(password),
  hasSpecial: /[*.!@#$%^&(){}[\]:;<>,?~_+\-=|\\/]/g.test(password),
  hasUppercase: /[A-Z]/g.test(password),
  hasValidLength: new RegExp(
    `.{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}`,
    'g',
  ).test(password),
  allValid: new RegExp(
    `(^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\\]:;<>,?~_+\\-=|\\\\/]).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$)`,
  ).test(password),
})
