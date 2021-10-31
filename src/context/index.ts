import { AuthContext } from 'context/auth'
import { CatalogsContext } from 'context/catalogs'
import ContextCompose from 'context/context-compose'
import { EmployeeByIdContext } from 'context/employee-by-id'
import { EmployeesContext } from 'context/employees'
import { SnackbarContext } from 'context/snackbar'
import { ThemeContext } from 'context/theme'

export {
  ContextCompose as default,
  AuthContext,
  ThemeContext,
  EmployeesContext,
  SnackbarContext,
  EmployeeByIdContext,
  CatalogsContext,
}
