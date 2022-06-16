import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { FC, useContext, useEffect, useMemo, useState } from 'react'

import EmployeesTable from 'containers/Employees/components/EmployeesTable'
import { useGetEmployees } from 'containers/Employees/hooks'
import { EmployeesContext } from 'context'

import { RequestState } from 'model/common'

const EmployeesPage: FC = () => {
  const { dispatch, state: employeesState } = useContext(EmployeesContext)
  const { error, state, data, count } = employeesState
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

  const isLoading = state === RequestState.Loading
  const requestIsEmpty = state === RequestState.Empty

  useEffect(() => {
    if (requestIsEmpty) {
      handleGetEmployees({ limit: pageSize, offset: currentPage * pageSize })
    }
  }, [pageSize, currentPage, handleGetEmployees, slice, requestIsEmpty])
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
          loading={isLoading}
          data={slice}
          count={count}
        />
      )}
    </Grid>
  )
}

export default EmployeesPage
