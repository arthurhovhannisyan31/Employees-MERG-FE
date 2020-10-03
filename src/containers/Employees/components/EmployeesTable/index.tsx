// deps
import React from 'react'
import Paper from '@material-ui/core/Paper'
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
// components
// helpers
import {
  initColumns,
  rowIdSelector,
  rowsSelector,
} from '_/containers/Employees/components/EmployeesTable/helpers'
import { IEmployeesTableRow } from '_/containers/Employees/types'
import { IEventFormAction } from '_/containers/Events/types'
import { IEmployee } from '_/types'

interface IProps {
  dispatch: React.Dispatch<IEventFormAction>
  data: IEmployee[]
}

const EmployeesTable: React.FC<IProps> = ({
  // dispatch,
  data,
}) => {
  // todo move to context state
  // useState
  const [columns] = React.useState(initColumns)
  const [rows, setRows] = React.useState<IEmployeesTableRow[]>([])

  // useCallback
  // useMemo
  const rowsItems = React.useMemo(() => data?.map(rowsSelector), [data])

  React.useEffect(() => {
    if (true) {
      setRows(rowsItems)
    }
  }, [rowsItems])

  return (
    <Paper>
      <Grid columns={columns} rows={rows} getRowId={rowIdSelector}>
        <VirtualTable />
        <TableHeaderRow />
      </Grid>
    </Paper>
  )
}

export default EmployeesTable
