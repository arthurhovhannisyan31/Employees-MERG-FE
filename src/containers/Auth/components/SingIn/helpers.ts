import * as yup from 'yup'

import { LoginInput } from 'model/generated'

export const validationSchema: yup.SchemaOf<LoginInput> = yup.object().shape({
  email: yup
    .string()
    .email()
    .trim()
    .nullable()
    .required('Please fill email')
    .min(2, 'Too short')
    .max(255, 'Too long'),
  password: yup.string().trim().nullable().required('Please fill password'),
})

export const initState: LoginInput = {
  email: '',
  password: '',
}
