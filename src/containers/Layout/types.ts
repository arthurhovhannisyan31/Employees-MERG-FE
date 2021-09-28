import { ReactNode } from 'react'

import { RouteName, RouteMapItem } from 'model/common'

export type TRouteIconMap = Partial<Record<RouteName, ReactNode>>

export interface IMenuDrawerItem extends RouteMapItem {
  icon: ReactNode
}
