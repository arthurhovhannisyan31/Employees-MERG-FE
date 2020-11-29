// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
// components
import EmployeesTable from '_/containers/Employees/components/EmployeesTable'
// model
import { IGetEmployeesInput } from '_/model/employee'
// helpers
import { AuthContext, EmployeesContext } from '_/context'
import { getEmployees } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/helpers'
import useStyles from '_/containers/Employees/style'

const Employees: React.FC = () => {
  // useStyle
  const classes = useStyles()
  // useContext
  const { token } = React.useContext(AuthContext)
  const { dispatch, state } = React.useContext(EmployeesContext)

  const { error, loading } = state
  // useState
  const [currentPage, setCurrentPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(5)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const apiUrl = process?.env?.API_URL || ''

  // useCallback
  const handleGetEmployees = React.useCallback(
    async ({ offset, limit }: IGetEmployeesInput) => {
      dispatch({ type: 'employees.loading', payload: true })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(getEmployees({ offset, limit })),
          headers,
        })
        fetchResponseCheck(res?.status)
        const {
          data: {
            employees: { nodes, count },
          },
        } = await res.json()
        dispatch({ type: 'employees.data', payload: nodes })
        dispatch({ type: 'employees.count', payload: count })
      } catch (err) {
        dispatch({ type: 'employees.error', payload: err })
      }
      dispatch({ type: 'employees.loading', payload: false })
    },
    [apiUrl, dispatch, headers]
  )
  React.useEffect(() => {
    handleGetEmployees({ limit: pageSize, offset: currentPage * pageSize })
  }, [pageSize, currentPage])

  if (loading) {
    return (
      <Grid container justify="center" className={classes.loadingIndicator}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid container direction="row">
        {error ? (
          <Typography>Regular error message</Typography>
        ) : (
          <EmployeesTable
            dispatch={dispatch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Employees
