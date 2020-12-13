// deps
import React from 'react'
import { useHistory } from 'react-router-dom'
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
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
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
  getAvatarLetters,
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
  // useRoute
  const history = useHistory()
  // useContext
  const { state } = React.useContext(EmployeesContext)

  const { data, count } = state
  // todo move to context state
  // todo move to reducer
  // todo add create an employee

  // useState
  const [columns] = React.useState(initColumns)
  const [rows] = React.useState<IEmployeesTableRow[]>(data?.map(rowsSelector))
  const [tableColumnExtensions] = React.useState<Table.ColumnExtension[]>(
    initColumnExtensions
  )
  // useMemo
  const initColumnsOrder = React.useMemo(() => getInitColumnsOrder(), [])
  const [columnOrder, setColumnOrder] = React.useState<string[]>(
    initColumnsOrder
  )
  // useCallback
  // handlers
  const handleChangePageSize = React.useCallback(setPageSize, [setPageSize])
  const handleChangeCurrentPage = React.useCallback(setCurrentPage, [
    setCurrentPage,
  ])
  const handleChangeColumnOrder = React.useCallback(setColumnOrder, [
    setColumnOrder,
  ])
  const handleRedirectProfile = (id: string) => () =>
    history.push(`/employees/${id}`)
  // containers
  const pagingContainer = React.useCallback(
    (props: PagingPanel.ContainerProps) => (
      <CustomPagingPanel
        {...{
          ...props,
          totalCount: count,
        }}
      />
    ),
    [count]
  )

  const tableCellContainer = (props: Table.DataCellProps) => {
    const {
      column: { name },
      row: { _id: id, first_name: firstName, last_name: lastName },
    } = props
    switch (name) {
      case 'link':
        return (
          <Table.Cell {...props}>
            <Button variant="text" onClick={handleRedirectProfile(id)}>
              <AccountBoxIcon />
            </Button>
          </Table.Cell>
        )
      case 'avatar':
        return (
          <Table.Cell {...props}>
            <Avatar variant="rounded">
              {getAvatarLetters(firstName, lastName)}
            </Avatar>
          </Table.Cell>
        )
      default:
        return <Table.Cell {...props} />
    }
  }
  // useMemo
  // todo add stub row to prevent table collapse

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
        <Table
          columnExtensions={tableColumnExtensions}
          cellComponent={tableCellContainer}
        />
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
