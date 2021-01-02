// deps
import React from 'react'
// helpers
import AuthContainer from '_/context/auth-context'
import EmployeeContainer from '_/context/employees-context'
import SnackbarContainer from '_/context/snackbar-context'
import ThemeContainer from '_/context/theme-context'
import EmployeeByIdContainer from '_/context/employee-by-id-context'

const ContextCompose: React.FC = ({ children }) => (
  <>
    {[
      AuthContainer,
      EmployeeContainer,
      SnackbarContainer,
      ThemeContainer,
      EmployeeByIdContainer
    ].reduceRight(
      (child: React.ReactNode, Container: React.FC) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
)

export default ContextCompose
