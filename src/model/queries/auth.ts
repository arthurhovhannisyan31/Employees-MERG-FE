import { QueryResponse, OmitTypeName } from 'model/common'
import { LoginResponse, MeResponse } from 'model/generated'

export interface QueryMeData {
  me: OmitTypeName<MeResponse>
}

export type QueryMeResponse = QueryResponse<QueryMeData>

export interface IQueryLoginData {
  login: OmitTypeName<LoginResponse>
}

export type IQueryLoginResponse = QueryResponse<IQueryLoginData>

export interface IQueryLogoutData {
  logout: boolean
}

export type IQueryLogoutResponse = QueryResponse<IQueryLogoutData>
