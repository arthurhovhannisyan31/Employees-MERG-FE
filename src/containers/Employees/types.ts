import {
  Employees, Employee,
} from '_/model/generated/graphql'

export interface IEmployeesTableRow {
  _id: string
  hire_date: string
  last_name: string
  first_name: string
  gender: string
  birth_date: string
}

// todo fix gender
export type TEmployeesTableRow = Pick<
Employee,
'_id' | 'hire_date' | 'last_name' | 'first_name' | 'gender' | 'birth_date'
>

export type TEmployeesFetchResponse = {
  data: {
    employees: Omit<Employees, '__typename'>
  }
}
