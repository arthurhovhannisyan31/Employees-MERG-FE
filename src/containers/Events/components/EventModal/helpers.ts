// deps
import * as Yup from 'yup'
// helpers
import { IEventFormFields } from '_/containers/Events/types'

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .nullable()
    .required('Please fill the title')
    .min(2, 'Too short!')
    .max(100, 'Too long!'),
  price: Yup.number()
    .nullable()
    .max(1000, 'Please use price below $1000')
    .typeError('Please fill full date value')
    .required('Please fill the date'),
  // date: Yup.date()
  //   .nullable()
  //   .typeError('Please fill correct date value')
  //   .required('Please fill the date'),
  description: Yup.string()
    .trim()
    .required('Please fill the description')
    .min(2, 'Too short!')
    .max(1000, 'Too long!'),
})

export const getInitState = ({
  description,
  price,
  title,
  date,
}: IEventFormFields) => ({
  description,
  price,
  title,
  date,
})
