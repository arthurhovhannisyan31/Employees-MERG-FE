// deps
import * as Yup from 'yup'
// local

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Please fill the title')
    .min(2, 'Too short!')
    .max(100, 'Too long!'),
  price: Yup.number().required('Please fill the price'),
  date: Yup.date().required('Please fill the date'),
  description: Yup.string()
    .trim()
    .required('Please fill the description')
    .min(2, 'Too short!')
    .max(1000, 'Too long!'),
})

export const getInitState = () => ({})
