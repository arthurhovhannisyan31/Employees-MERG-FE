// deps
// helpers
import { IEmployee } from '_/types'

export const initColumns = [
  { name: 'birth_date', title: 'Birth Date' },
  { name: 'first_name', title: 'First Name' },
  { name: 'gender', title: 'Gender' },
  { name: 'hire_date', title: 'Hire Date' },
  { name: 'last_name', title: 'Last Name' },
]

export const rowsSelector = ({
  _id,
  hire_date,
  last_name,
  first_name,
  gender: { name: genderName },
  birth_date,
}: IEmployee) => ({
  _id,
  hire_date,
  last_name,
  first_name,
  genderName,
  birth_date,
})

export const rowIdSelector = ({ _id }: IEmployee) => _id
