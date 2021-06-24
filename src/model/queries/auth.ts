import { QueryResponse, OmitTypeName } from 'model/common'
import { UserCredentials } from 'model/generated'

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
