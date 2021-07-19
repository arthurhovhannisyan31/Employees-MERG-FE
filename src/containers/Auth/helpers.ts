import { useMemo } from 'react'
import { getAuthFreeRoutes } from '_/routes/helpers'

export const useIsAuthFreeRoute = (route: string): boolean => {
  const nonPrivateRoutes = useMemo(() => getAuthFreeRoutes(), [])
  return nonPrivateRoutes.some((routeBase) => route.includes(routeBase))
}
