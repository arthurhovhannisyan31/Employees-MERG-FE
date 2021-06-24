import { QueryResponse, OmitTypeName } from '_/model/common'
import { UserCredentials } from '_/model/generated'

export interface IQueryMeData {
  me: OmitTypeName<UserCredentials>
}

export type IQueryMeResponse = QueryResponse<IQueryMeData>

export interface IQueryLoginData {
  login: {
    userCredentials: OmitTypeName<UserCredentials>
  }
}

export type IQueryLoginResponse = QueryResponse<IQueryLoginData>

export interface IQueryLogoutData {
  logout: boolean
}

export type IQueryLogoutResponse = QueryResponse<IQueryLogoutData>
