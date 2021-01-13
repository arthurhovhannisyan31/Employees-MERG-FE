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
import { fetchResponseCheck } from '_/utils/auth'

const EmployeesPage: React.FC = () => {
  // context
  const { headers } = React.useContext(AuthContext)
  const { dispatch, state } = React.useContext(EmployeesContext)
  const {
    error, loading, data, count,
  } = state
  // state
  const [currentPage, setCurrentPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(5)
  // memo
  const key = React.useMemo(() => `${pageSize}-${currentPage}`, [pageSize, currentPage]);
  const apiUrl = React.useMemo(() => process?.env?.API_URL || '', [])
  const handleGetEmployees = React.useCallback(
    async ({ offset, limit }: GetEmployeesInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(getEmployees({ offset, limit })),
          headers,
        })
        fetchResponseCheck(res?.status)
        const { data: { employees: { nodes, count: quantity } } }: TEmployeesFetchResponse =
          await res.json()
        dispatch({
          type: 'data',
          payload: {
            data: nodes,
            key,
          },
        })
        dispatch({
          type: 'count',
          payload: { count: quantity },
        })
      } catch (err) {
        dispatch({
          type: 'error',
          payload: { error: err },
        })
      }
      dispatch({
        type: 'loading',
        payload: { loading: false },
      })
    },
    [apiUrl, dispatch, headers, key],
  )
  const slice = React.useMemo(() => data?.[key] || [], [key, data]);

  React.useEffect(() => {
    if (!slice.length) {
      handleGetEmployees({ limit: pageSize, offset: currentPage * pageSize })
    }
  }, [pageSize, currentPage, handleGetEmployees, slice])
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
            data={slice}
            count={count}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default EmployeesPage
