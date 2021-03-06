import { IQueryResponse, OmitTypeName } from '_/model/common'
import { UserCredentials } from '_/model/generated'

export interface IQueryMeData {
  me: OmitTypeName<UserCredentials>
}

export type IQueryMeResponse = IQueryResponse<IQueryMeData>

export interface IQueryLoginData {
  login: {
    userCredentials: OmitTypeName<UserCredentials>
  }
}

export type IQueryLoginResponse = IQueryResponse<IQueryLoginData>

export interface IQueryLogoutData {
  logout: boolean
}

export type IQueryLogoutResponse = IQueryResponse<IQueryLogoutData>
