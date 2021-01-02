// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// components
import EmployeesTable from '_/containers/Employees/components/EmployeesTable'
// model
import { GetEmployeesInput } from '_/model/generated/graphql'
import { TEmployeesFetchResponse } from '_/containers/Employees/types'
// helpers
import { AuthContext, EmployeesContext } from '_/context'
import { getEmployees } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/helpers'

const EmployeesPage: React.FC = () => {
  // context
  const { headers } = React.useContext(AuthContext)
  const { dispatch, state } = React.useContext(EmployeesContext)
  const { error, loading } = state
  // state
  const [currentPage, setCurrentPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(5)
  // memo
  const apiUrl = React.useMemo(() => process?.env?.API_URL || '', [])
  const handleGetEmployees = React.useCallback(
    async ({ offset, limit }: GetEmployeesInput) => {
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
        }: TEmployeesFetchResponse = await res.json()
        dispatch({ type: 'employees.data', payload: nodes })
        dispatch({ type: 'employees.count', payload: count })
      } catch (err) {
        dispatch({ type: 'employees.error', payload: err })
      }
      dispatch({ type: 'employees.loading', payload: false })
    },
    [apiUrl, dispatch, headers],
  )

  React.useEffect(() => {
    handleGetEmployees({ limit: pageSize, offset: currentPage * pageSize })
  }, [pageSize, currentPage, handleGetEmployees])

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
            loading={loading}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default EmployeesPage
