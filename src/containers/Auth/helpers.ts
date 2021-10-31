import * as yup from 'yup'

export const sharedYupFields = {
  name: yup
    .string()
    .trim()
    .nullable()
    .required('Please fill email')
    .min(2, 'Too short')
    .max(255, 'Too long'),
  email: yup
    .string()
    .email()
    .trim()
    .nullable()
    .required('Please fill email')
    .min(2, 'Too short')
    .max(255, 'Too long'),
  password: yup.string().trim().nullable().required('Please fill password'),
}
