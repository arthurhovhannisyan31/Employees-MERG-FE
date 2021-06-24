import { Table } from '@devexpress/dx-react-grid-material-ui'
import format from 'date-fns/format'

import { Employee } from 'model/generated'
import { IEmployeesTableRow } from 'containers/Employees/types'
export const rowIdSelector = ({ _id }: Omit<Employee, '__typename'>): string =>
  _id

export const rowsSelector = ({
  _id,
  hire_date,
  last_name,
  first_name,
  gender,
  birth_date,
}: Omit<Employee, '__typename'>): IEmployeesTableRow => ({
  _id,
  hire_date: format(new Date(hire_date), 'dd-MMM-yyyy'),
  last_name,
  first_name,
  gender,
  birth_date: format(new Date(birth_date), 'dd-MMM-yyyy'),
})

export const initColumns = [
  { name: 'avatar', title: ' ' },
  { name: 'first_name', title: 'First Name' },
  { name: 'last_name', title: 'Last Name' },
  { name: 'gender', title: 'Gender' },
  { name: 'hire_date', title: 'Hire Date' },
  { name: 'birth_date', title: 'Birth Date' },
]

export const getInitColumnsOrder = (): string[] =>
  initColumns.map((column) => column.name)

export const initColumnExtensions: Table.ColumnExtension[] = [
  { columnName: 'gender', align: 'left' },
  { columnName: 'first_name', align: 'left' },
  { columnName: 'last_name', align: 'left' },
  { columnName: 'hire_date', align: 'left' },
  { columnName: 'birth_date', align: 'left' },
  { columnName: 'details', align: 'left' },
]

export const pageSizes = [5, 10, 20, 50, 100]

export const getAvatarLetters = (str1: string, str2: string): string =>
  `${str1[0].toUpperCase()}${str2[0].toUpperCase()}`
