import { IGender } from '_/types'

export interface IEmployee {
  _id: string
  birth_date: string
  first_name: string
  last_name: string
  gender: IGender
  hire_date: string
}
