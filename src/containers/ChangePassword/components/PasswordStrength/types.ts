export interface PasswordStrengthProps {
  validation: PassportStrengthValidation
  touched: boolean
}

export interface PassportStrengthValidation {
  hasUppercase?: boolean
  hasLowercase?: boolean
  hasDigits?: boolean
  hasSpecial?: boolean
  hasValidLength?: boolean
  allValid: boolean
}
