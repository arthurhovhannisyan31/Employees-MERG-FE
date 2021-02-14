// deps
import React from 'react'
// helpers
import AuthContainer from '_/context/auth'
import EmployeeContainer from '_/context/employees'
import SnackbarContainer from '_/context/snackbar'
import ThemeContainer from '_/context/theme'
import EmployeeByIdContainer from '_/context/employee-by-id'

const ContextCompose: React.FC = ({ children }) => (
  <>
    {[
      AuthContainer,
      EmployeeContainer,
      SnackbarContainer,
      ThemeContainer,
      EmployeeByIdContainer,
    ].reduceRight(
      (child: React.ReactNode, Container: React.FC) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
)

export default ContextCompose
