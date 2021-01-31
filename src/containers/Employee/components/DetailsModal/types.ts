// model
import { Employee } from '_/model/generated/graphql'

export interface IEmployeeModalProps
  extends Pick<
    Employee,
    'birth_date' | 'hire_date' | 'first_name' | 'last_name'
  > {
  title: string
  department: string
}
