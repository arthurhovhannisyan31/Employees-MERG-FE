// deps
import React from 'react'
import { Home, People, Info } from '@material-ui/icons'
// model
import { ERouteName, IRouteMap } from '_/model/common'
import { IMenuDrawerItem, TRouteIconMap } from '_/containers/Layout/types'

export const routesIconMap: TRouteIconMap = {
  [ERouteName.HOME]: <Home />,
  [ERouteName.EMPLOYEES]: <People />,
  [ERouteName.ABOUT]: <Info />,
}

export const getMenuDrawerItems = (
  routes: IRouteMap,
  iconMap: TRouteIconMap,
): IMenuDrawerItem[] =>
  Object.entries(iconMap).reduce((acc: IMenuDrawerItem[], [key, icon]) => {
    if (key in routes) {
      acc.push({
        ...routes[key as ERouteName],
        icon,
      })
    }
    return acc
  }, [])
