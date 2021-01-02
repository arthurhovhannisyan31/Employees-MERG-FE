import {
  Employee,
} from '_/model/generated/graphql'

export type TEmployeeFetchResponse = {
  data: {
    employee: Omit<Employee, '__typename'>
  }
}
