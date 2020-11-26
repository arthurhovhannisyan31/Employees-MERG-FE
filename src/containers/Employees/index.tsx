// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
// components
import EmployeesTable from '_/containers/Employees/components/EmployeesTable'
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

  const { error, loading, data: employeesData } = state

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const apiUrl = process?.env?.API_URL || ''

  // useCallback
  const handleGetEmployees = React.useCallback(async () => {
    dispatch({ type: 'employees.loading', payload: true })
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getEmployees()),
        headers,
      })
      fetchResponseCheck(res?.status)
      const response = await res.json()
      const {
        data: {
          employees: { nodes },
        },
      } = response
      dispatch({ type: 'employees.data', payload: nodes })
    } catch (err) {
      dispatch({ type: 'employees.error', payload: err })
    }
    dispatch({ type: 'employees.loading', payload: false })
  }, [apiUrl, headers, dispatch])

  React.useEffect(() => {
    handleGetEmployees()
    // eslint-disable-next-line
  }, [])

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
          <EmployeesTable dispatch={dispatch} data={employeesData} />
        )}
      </Grid>
    </Grid>
  )
}

export default Employees
