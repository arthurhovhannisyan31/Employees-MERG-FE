import { RouteName, routeNameLabelMap, RoutePath } from 'model/routes/configs'
import { RouteMap } from 'model/routes/types'

export const routes: RouteMap = {
  [RouteName.HOME]: {
    label: routeNameLabelMap[RouteName.HOME],
    basePath: RoutePath.HOME,
    exact: true,
    isPrivate: true,
    path: RoutePath.HOME,
  },
  [RouteName.AUTH]: {
    label: routeNameLabelMap[RouteName.AUTH],
    basePath: RoutePath.AUTH,
    exact: false,
    isPrivate: false,
    path: `${RoutePath.AUTH}/:next?`,
  },
  [RouteName.CHANGE_PASSWORD]: {
    label: routeNameLabelMap[RouteName.CHANGE_PASSWORD],
    basePath: RoutePath.CHANGE_PASSWORD,
    exact: false,
    isPrivate: false,
    path: `${RoutePath.CHANGE_PASSWORD}/:id`,
  },
  [RouteName.ABOUT]: {
    label: routeNameLabelMap[RouteName.ABOUT],
    basePath: RoutePath.ABOUT,
    exact: true,
    isPrivate: false,
    path: RoutePath.ABOUT,
  },
  [RouteName.EMPLOYEES]: {
    label: routeNameLabelMap[RouteName.EMPLOYEES],
    basePath: RoutePath.EMPLOYEES,
    exact: true,
    isPrivate: true,
    path: RoutePath.EMPLOYEES,
  },
  [RouteName.EMPLOYEE]: {
    label: routeNameLabelMap[RouteName.EMPLOYEE],
    basePath: RoutePath.EMPLOYEES,
    exact: true,
    isPrivate: true,
    path: `${RoutePath.EMPLOYEES}/:id`,
  },
  [RouteName.NOT_FOUND]: {
    label: routeNameLabelMap[RouteName.NOT_FOUND],
    basePath: RoutePath.NOT_FOUND,
    exact: true,
    isPrivate: true,
    path: RoutePath.NOT_FOUND,
  },
}
