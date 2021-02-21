// deps
import * as yup from 'yup'
// model
import { Employee, Title } from '_/model/generated/graphql'
import { IEmployeeModalProps } from '_/containers/Employee/components/DetailsModal/types'

export const initStateSelector = ({
  title,
  birth_date,
  hire_date,
  department,
  first_name,
  last_name,
}: Employee): IEmployeeModalProps => ({
  title: title._id,
  birth_date,
  hire_date,
  department: department._id,
  first_name,
  last_name,
})

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .nullable()
    .required('Please fill title')
    .min(2, 'Too short')
    .max(255, 'Too long'),
  birth_date: yup
    .date()
    .nullable()
    .typeError('Please fill correct birth date')
    .required('Please fill birth date'),
  hire_date: yup
    .date()
    .nullable()
    .typeError('Please fill correct birth date')
    .required('Please fill birth date')
    // todo check 18 yo
    .test('min-age', 'Must be at least 18 y.o.', (value) => {
      console.log(value)
      return true
    }),
  department: yup.string().nullable().required('Please fill department'),
  gender: yup.string().nullable().required('Please fill gender'),
  first_name: yup
    .string()
    .trim()
    .nullable()
    .required('Please fill first name')
    .min(2, 'Too short')
    .max(255, 'Too long'),
  last_name: yup
    .string()
    .trim()
    .nullable()
    .required('Please fill last name')
    .min(2, 'Too short')
    .max(255, 'Too long'),
})

export const sortByName = (a: Pick<Title, 'name'>, b: Pick<Title, 'name'>) =>
  a.name.localeCompare(b.name)
