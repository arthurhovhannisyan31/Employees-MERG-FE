import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { useContext, useState, useMemo, useEffect, FC } from 'react'

import EmployeesTable from 'containers/Employees/components/EmployeesTable'
import { useGetEmployees } from 'containers/Employees/hooks'
import { EmployeesContext } from 'context'

const EmployeesPage: FC = () => {
  const { dispatch, state } = useContext(EmployeesContext)
  const { error, loading, data, count } = state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const key = useMemo(
    () => `${pageSize}-${currentPage}`,
    [pageSize, currentPage],
  )

  const [handleGetEmployees] = useGetEmployees({
    pageSize,
    currentPage,
    dispatch,
  })
  const slice = useMemo(() => data?.[key] || [], [key, data])

  useEffect(() => {
    if (!slice.length) {
      handleGetEmployees({ limit: pageSize, offset: currentPage * pageSize })
    }
  }, [pageSize, currentPage, handleGetEmployees, slice])
  return (
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
  )
}

export default EmployeesPage
