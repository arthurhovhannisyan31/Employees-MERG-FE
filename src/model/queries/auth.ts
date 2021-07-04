import { QueryResponse, OmitTypeName } from '_/model/common'
import { LoginResponse, MeResponse } from '_/model/generated'

export interface IQueryMeData {
  me: OmitTypeName<MeResponse>
}

export type IQueryMeResponse = QueryResponse<IQueryMeData>

export interface IQueryLoginData {
  login: OmitTypeName<LoginResponse>
}

export type IQueryLoginResponse = QueryResponse<IQueryLoginData>

export interface IQueryLogoutData {
  logout: boolean
}

export type IQueryLogoutResponse = QueryResponse<IQueryLogoutData>
