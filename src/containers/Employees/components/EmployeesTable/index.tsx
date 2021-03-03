// deps
import React from 'react'
import { useHistory } from 'react-router-dom'
import MUIGrid from '@material-ui/core/Grid'
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
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
// components
import CustomPagingPanel from '_/containers/Employees/components/EmployeesTable/components/CustomPagingPanel'
import Backdrop from '_/components/UI/Backdrop'
// model
import { IEmployeesTableRow } from '_/containers/Employees/types'
import { TEmployeesAction } from '_/model/context/employees'
import { Employee } from '_/model/generated'
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
import useStyles from './style'

interface IProps {
  dispatch: React.Dispatch<TEmployeesAction>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  loading?: boolean
  data: Employee[]
  count: number
}

const EmployeesTable: React.FC<IProps> = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  loading,
  count,
  data,
}) => {
  const cls = useStyles()

  const history = useHistory()

  // todo add create an employee
  const [columns] = React.useState(initColumns)
  const [rows, setRows] = React.useState<IEmployeesTableRow[]>(
    data?.map(rowsSelector),
  )
  const [tableColumnExtensions] = React.useState<Table.ColumnExtension[]>(
    initColumnExtensions,
  )

  const initColumnsOrder = React.useMemo(() => getInitColumnsOrder(), [])
  const [columnOrder, setColumnOrder] = React.useState<string[]>(
    initColumnsOrder,
  )

  const handleChangePageSize = React.useCallback(setPageSize, [setPageSize])
  const handleChangeCurrentPage = React.useCallback(setCurrentPage, [
    setCurrentPage,
  ])
  const handleChangeColumnOrder = React.useCallback(setColumnOrder, [
    setColumnOrder,
  ])
  const handleRedirectProfile = React.useCallback(
    (id: string) => () => history.push(`/employees/${id}`),
    [history],
  )

  const pagingContainer = React.useCallback(
    (props: PagingPanel.ContainerProps) => {
      const newProps = {
        ...props,
        totalCount: count,
      }
      return <CustomPagingPanel {...newProps} />
    },
    [count],
  )

  const tableCellContainer = (props: Table.DataCellProps) => {
    const {
      column: { name },
      row: { _id: id, first_name: firstName, last_name: lastName },
    } = props
    switch (name) {
      case 'avatar':
        return (
          <Table.Cell {...props}>
            <Avatar
              variant="rounded"
              onClick={handleRedirectProfile(id)}
              className={cls.avatar}
            >
              {getAvatarLetters(firstName, lastName)}
            </Avatar>
          </Table.Cell>
        )
      default:
        return <Table.Cell {...props} />
    }
  }

  React.useEffect(() => {
    if (data.length) {
      setRows(data?.map(rowsSelector))
    }
  }, [data])

  return (
    <Paper className={cls.container}>
      {loading && (
        <MUIGrid
          container
          justify="center"
          className={cls.loadingSplash}
          alignItems="center"
        >
          <Backdrop isAbsolute />
          <CircularProgress />
        </MUIGrid>
      )}
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
