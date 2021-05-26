import { EROUTES } from '_/model/common'

export const ADULT_AGE = 18

export const ROUTES: Record<keyof typeof EROUTES, string> = {
  HOME: '/',
  AUTH: `/${EROUTES.AUTH}/:next?`,
  ABOUT: `/${EROUTES.ABOUT}`,
  EMPLOYEES: `/${EROUTES.EMPLOYEES}`,
  EMPLOYEE: `/${EROUTES.EMPLOYEE}/:id`,
  NOT_FOUND: EROUTES.NOT_FOUND,
}
