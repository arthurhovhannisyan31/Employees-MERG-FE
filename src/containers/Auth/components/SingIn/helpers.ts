import * as yup from 'yup'

import { UserInput } from 'model/generated'

export const validationSchema: yup.SchemaOf<UserInput> = yup.object().shape({
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
