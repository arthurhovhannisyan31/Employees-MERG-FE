// deps
import React from 'react'
import Paper from '@material-ui/core/Paper'
import { PagingState } from '@devexpress/dx-react-grid'
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
import CustomPagingPanel from '_/containers/Employees/components/EmployeesTable/components/CustomPagingPanel'
// model
import { IEmployeesTableRow } from '_/containers/Employees/types'
import { IEventFormAction } from '_/containers/Events/types'
// helpers
import {
  initColumns,
  rowIdSelector,
  rowsSelector,
  initColumnExtensions,
  getInitColumnsOrder,
  pageSizes,
} from '_/containers/Employees/components/EmployeesTable/helpers'
import { EmployeesContext } from '_/context'

interface IProps {
  dispatch: React.Dispatch<IEventFormAction>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

const EmployeesTable: React.FC<IProps> = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}) => {
  console.log(pageSize, currentPage)
  // useContext
  const { state } = React.useContext(EmployeesContext)

  const { data, count } = state
  console.log(count)
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
  // useCallback
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
  const pagingContainer = (props: PagingPanel.ContainerProps) => (
    <CustomPagingPanel
      {...{
        ...props,
        totalCount: count,
      }}
    />
  )

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
        {/* <IntegratedPaging /> */}
        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={handleChangeColumnOrder}
        />
        <TableHeaderRow />
        <PagingPanel
          pageSizes={pageSizes}
          containerComponent={pagingContainer}
        />
        <Toolbar />
      </Grid>
    </Paper>
  )
}

export default EmployeesTable
