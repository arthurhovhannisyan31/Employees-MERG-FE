// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// components
import EmployeesTable from '_/containers/Employees/components/EmployeesTable'
// model
// helpers
import { EmployeesContext } from '_/context'
import { useGetEmployees } from '_/containers/Employees/hooks'

const EmployeesPage: React.FC = () => {
  // context
  const { dispatch, state } = React.useContext(EmployeesContext)
  const { error, loading, data, count } = state
  // state
  const [currentPage, setCurrentPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(5)
  // memo
  const key = React.useMemo(() => `${pageSize}-${currentPage}`, [
    pageSize,
    currentPage,
  ])

  const [handleGetEmployees] = useGetEmployees({
    pageSize,
    currentPage,
    dispatch,
  })
  const slice = React.useMemo(() => data?.[key] || [], [key, data])

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
