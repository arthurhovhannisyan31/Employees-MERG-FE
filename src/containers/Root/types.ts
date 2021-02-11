// model
import { IFetchError } from '_/model/common'

export interface IMeFetchResponse {
  data: {
    me: any
  }
  errors?: IFetchError[]
}
