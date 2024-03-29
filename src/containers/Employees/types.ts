import { Employee } from 'model/generated'

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
