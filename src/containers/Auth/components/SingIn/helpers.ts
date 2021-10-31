import * as yup from 'yup'

import { sharedYupFields } from 'containers/Auth/helpers'

import { LoginInput } from 'model/generated'

export const validationSchema: yup.SchemaOf<LoginInput> = yup.object().shape({
  email: sharedYupFields.email,
  password: sharedYupFields.password,
})

export const initState: LoginInput = {
  email: '',
  password: '',
}
