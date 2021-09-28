import React, { FC, ReactNode } from 'react'

import AuthContainer from 'context/auth'
import CatalogsContainer from 'context/catalogs'
import EmployeeByIdContainer from 'context/employee-by-id'
import EmployeeContainer from 'context/employees'
import SnackbarContainer from 'context/snackbar'
import ThemeContainer from 'context/theme'

const ContextCompose: FC = ({ children }) => (
  <>
    {[
      AuthContainer,
      EmployeeContainer,
      SnackbarContainer,
      ThemeContainer,
      EmployeeByIdContainer,
      CatalogsContainer,
    ].reduceRight(
      (child: ReactNode, Container: FC) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
)

export default ContextCompose
