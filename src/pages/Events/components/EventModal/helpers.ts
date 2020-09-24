// deps
import * as Yup from 'yup'
// helpers
import { IEventForm } from '_/pages/Events/types'
import { regExp } from '_/utils/helpers'

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .nullable()
    .required('Please fill the title')
    .min(2, 'Too short!')
    .max(100, 'Too long!'),
  price: Yup.string()
    .trim()
    .required('Please fill the price')
    .matches(regExp.numbers, 'Please type correct value'),
  date: Yup.date().nullable().required('Please fill the date'),
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
}: IEventForm) => ({
  description,
  price,
  title,
  date,
})
