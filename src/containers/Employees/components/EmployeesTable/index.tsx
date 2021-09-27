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
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import MUIGrid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react'
import { useHistory } from 'react-router-dom'

import Backdrop from 'components/UI/Backdrop'
import CustomPagingPanel from 'containers/Employees/components/EmployeesTable/components/CustomPagingPanel'
import {
  initColumns,
  rowIdSelector,
  rowsSelector,
  initColumnExtensions,
  getInitColumnsOrder,
  pageSizes,
  getAvatarLetters,
} from 'containers/Employees/components/EmployeesTable/helpers'
import { IEmployeesTableRow } from 'containers/Employees/types'

import { TEmployeesAction } from 'model/context/employees'
import { Employee } from 'model/generated'

import useStyles from './style'

interface IProps {
  dispatch: (val: TEmployeesAction) => void
  currentPage: number
  setCurrentPage: (val: number) => void
  pageSize: number
  setPageSize: (val: number) => void
  loading?: boolean
  data: Employee[]
  count: number
}

const EmployeesTable: FC<IProps> = ({
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
  const [columns] = useState(initColumns)
  const [rows, setRows] = useState<IEmployeesTableRow[]>(
    data?.map(rowsSelector),
  )
  const [tableColumnExtensions] =
    useState<Table.ColumnExtension[]>(initColumnExtensions)

  const initColumnsOrder = useMemo(() => getInitColumnsOrder(), [])
  const [columnOrder, setColumnOrder] = useState<string[]>(initColumnsOrder)

  const handleChangePageSize = useCallback(setPageSize, [setPageSize])
  const handleChangeCurrentPage = useCallback(setCurrentPage, [setCurrentPage])
  const handleChangeColumnOrder = useCallback(setColumnOrder, [setColumnOrder])
  const handleRedirectProfile = useCallback(
    (id: string) => () => history.push(`/employees/${id}`),
    [history],
  )

  const pagingContainer = useCallback(
    (props: PagingPanel.ContainerProps) => {
      const newProps = {
        ...props,
        totalCount: count,
      }
      return <CustomPagingPanel {...newProps} />
    },
    [count],
  )

  const tableCellContainer = (props: Table.DataCellProps): JSX.Element => {
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

  useEffect(() => {
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
