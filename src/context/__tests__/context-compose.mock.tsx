import React, { FC, ReactNode } from 'react'

import { AuthContextContainer, authInitState } from 'context/auth'
import { CatalogsContextContainer, catalogsInitState } from 'context/catalogs'
import {
  employeeByIdInitState,
  EmployeeContextContainer,
} from 'context/employee-by-id'
import {
  EmployeesContextContainer,
  employeesInitState,
} from 'context/employees'
import SnackbarContainer from 'context/snackbar'
import ThemeContainer from 'context/theme'

import { AuthContextProps } from 'model/context/auth'
import { CatalogsState } from 'model/context/catalogs'
import { EmployeeByIdState } from 'model/context/employee'
import { EmployeesState } from 'model/context/employees'

interface ContextComposeMockProps {
  children?: ReactNode
  authContextInitState?: AuthContextProps
  employeesContextInitState?: EmployeesState
  employeeContextInitState?: EmployeeByIdState
  catalogsContextInitState?: CatalogsState
}

export const ContextComposeMock: FC<ContextComposeMockProps> = ({
  children = null,
  authContextInitState = authInitState,
  employeesContextInitState = employeesInitState,
  employeeContextInitState = employeeByIdInitState,
  catalogsContextInitState = catalogsInitState,
}) => {
  return (
    <AuthContextContainer initState={authContextInitState}>
      <EmployeesContextContainer initState={employeesContextInitState}>
        <SnackbarContainer>
          <ThemeContainer>
            <EmployeeContextContainer initState={employeeContextInitState}>
              <CatalogsContextContainer initState={catalogsContextInitState}>
                {children}
              </CatalogsContextContainer>
            </EmployeeContextContainer>
          </ThemeContainer>
        </SnackbarContainer>
      </EmployeesContextContainer>
    </AuthContextContainer>
  )
}
