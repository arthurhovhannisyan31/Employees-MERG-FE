import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { FC, useContext, useEffect, useMemo, useState } from 'react'

import EmployeesTable from 'containers/Employees/components/EmployeesTable'
import { useGetEmployees } from 'containers/Employees/hooks'
import { EmployeesContext } from 'context'

const EmployeesPage: FC = () => {
  const { dispatch, state } = useContext(EmployeesContext)
  const { error, data, count, loading } = state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const key = useMemo(
    () => `${pageSize}-${currentPage * pageSize}`,
    [currentPage, pageSize],
  )

  const [handleGetEmployees] = useGetEmployees({
    dispatch,
  })
  const slice = useMemo(() => data?.[key] || [], [data, key])

  useEffect(() => {
    const isReady = !!data?.[key]
    if (!isReady) {
      handleGetEmployees({ limit: pageSize, offset: currentPage * pageSize })
    }
  }, [pageSize, currentPage, handleGetEmployees, data, key])

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
