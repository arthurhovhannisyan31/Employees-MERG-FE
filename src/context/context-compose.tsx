import React, { FC, ReactNode } from 'react'

import { AuthContextContainer } from 'context/auth'
import { CatalogsContextContainer } from 'context/catalogs'
import { EmployeeContextContainer } from 'context/employee-by-id'
import { EmployeesContextContainer } from 'context/employees'
import SnackbarContainer from 'context/snackbar'
import ThemeContainer from 'context/theme'

const ContextCompose: FC = ({ children }) => (
  <>
    {[
      AuthContextContainer,
      EmployeesContextContainer,
      SnackbarContainer,
      ThemeContainer,
      EmployeeContextContainer,
      CatalogsContextContainer,
    ].reduceRight(
      (child: ReactNode, Container: FC) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
)

export default ContextCompose
