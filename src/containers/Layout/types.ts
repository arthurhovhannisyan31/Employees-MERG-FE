// deps
import React from 'react'
// model
import { RouteName, RouteMapItem } from '_/model/common'

export type TRouteIconMap = Partial<Record<RouteName, React.ReactNode>>

export interface IMenuDrawerItem extends RouteMapItem {
  icon: React.ReactNode
}
