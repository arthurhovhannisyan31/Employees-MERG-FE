import * as yup from 'yup'

import { SignUpProps } from 'containers/Auth/components/SignUp/types'
import { sharedYupFields } from 'containers/Auth/helpers'

export const validationSchema: yup.SchemaOf<SignUpProps> = yup.object().shape({
  email: sharedYupFields.email,
  password: sharedYupFields.password,
  name: sharedYupFields.name,
  showPassword: yup.boolean().required(),
})

export const initState: SignUpProps = {
  email: '',
  password: '',
  name: '',
  showPassword: false,
}
