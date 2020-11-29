// helpers
import { IEmployee } from '_/model/employee'

export const rowIdSelector = ({ _id }: IEmployee) => _id

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
  gender: genderName,
  birth_date,
})

export const initColumns = [
  { name: 'first_name', title: 'First Name' },
  { name: 'last_name', title: 'Last Name' },
  { name: 'gender', title: 'Gender' },
  { name: 'hire_date', title: 'Hire Date' },
  { name: 'birth_date', title: 'Birth Date' },
  { name: 'details', title: '' },
]

export const getInitColumnsOrder = () =>
  initColumns.map((column) => column.name)

export const initColumnExtensions = [{ columnName: 'gender', width: 100 }]

export const pageSizes = [5, 10, 20, 50, 100]
