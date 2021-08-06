// deps
import * as yup from 'yup'
// model
import { UserInput } from '_/model/generated'

export const validationSchema: yup.SchemaOf<Pick<UserInput, 'password'>> = yup
  .object()
  .shape({
    password: yup.string().trim().nullable().required('Please fill password'),
  })
