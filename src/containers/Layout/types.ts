// deps
import React from 'react'
// model
import { ERoutes, IRouteMapItem } from '_/model/common'

export type TRouteIconMap = Partial<Record<ERoutes, React.ReactNode>>

export interface IMenuDrawerItem extends IRouteMapItem {
  icon: React.ReactNode
}
