// deps
import React from 'react'
import Paper from '@material-ui/core/Paper'
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid'
import {
  DragDropProvider,
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  TableColumnReordering,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
// components
// model
import { IEmployeesTableRow } from '_/containers/Employees/types'
import { IEventFormAction } from '_/containers/Events/types'
import { IEmployee } from '_/model/employee'
// helpers
import {
  initColumns,
  rowIdSelector,
  rowsSelector,
  initColumnExtensions,
  getInitColumnsOrder,
  pageSizes,
} from '_/containers/Employees/components/EmployeesTable/helpers'

interface IProps {
  dispatch: React.Dispatch<IEventFormAction>
  data: IEmployee[]
}

const EmployeesTable: React.FC<IProps> = ({
  // dispatch,
  data,
}) => {
  // todo move to context state
  // todo move to reducer
  // useState
  const [columns] = React.useState(initColumns)
  const [rows, setRows] = React.useState<IEmployeesTableRow[]>([])
  const [tableColumnExtensions] = React.useState<Table.ColumnExtension[]>(
    initColumnExtensions
  )
  const initColumnsOrder = React.useMemo(() => getInitColumnsOrder(), [])
  const [columnOrder, setColumnOrder] = React.useState<string[]>(
    initColumnsOrder
  )
  const [currentPage, setCurrentPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(5)

  // useCallback
  // todo add memo for all DOM handlers
  const handleChangePageSize = React.useCallback(setPageSize, [setPageSize])
  const handleChangeCurrentPage = React.useCallback(setCurrentPage, [
    setCurrentPage,
  ])
  const handleChangeColumnOrder = React.useCallback(setColumnOrder, [
    setColumnOrder,
  ])
  const handleChangeRows = React.useCallback(setRows, [setRows])
  // useMemo
  const rowsItems = React.useMemo(() => data?.map(rowsSelector), [data])

  React.useEffect(() => {
    // todo add condition for fetch
    if (true) {
      handleChangeRows(rowsItems)
    }
  }, [rowsItems, handleChangeRows])

  return (
    <Paper>
      <Grid columns={columns} rows={rows} getRowId={rowIdSelector}>
        <DragDropProvider />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={handleChangeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={handleChangePageSize}
        />
        <IntegratedPaging />
        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={handleChangeColumnOrder}
        />
        <TableHeaderRow />
        <PagingPanel pageSizes={pageSizes} />
        <Toolbar />
      </Grid>
    </Paper>
  )
}

export default EmployeesTable
