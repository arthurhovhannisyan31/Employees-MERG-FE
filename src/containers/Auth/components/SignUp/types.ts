import { CreateUserInput } from 'model/generated'

export interface SignUpProps extends CreateUserInput {
  showPassword: boolean
}
