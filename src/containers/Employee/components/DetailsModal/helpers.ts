import differenceInYears from 'date-fns/differenceInYears'
import * as yup from 'yup'

import { ADULT_AGE } from 'utils/constants'

import { Employee, Title, UpdateEmployeeInput } from 'model/generated'

export const initStateSelector = ({
  _id,
  title,
  birth_date,
  hire_date,
  department,
  first_name,
  last_name,
}: Employee): UpdateEmployeeInput => ({
  id: _id,
  title,
  birth_date,
  hire_date,
  department,
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
    .typeError('Please fill correct hire date')
    .required('Please fill hire date')
    .test(
      'min-age',
      'Must be at least 18 y.o.',
      (hire_date, { parent: { birth_date } }) =>
        differenceInYears(
          new Date(hire_date as unknown as string),
          new Date(birth_date),
        ) >= ADULT_AGE,
    ),
  department: yup.string().nullable().required('Please fill department'),
  first_name: yup
    .string()
    .trim()
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

export const sortByName = (
  a: Pick<Title, 'name'>,
  b: Pick<Title, 'name'>,
): number => a.name.localeCompare(b.name)
