// deps
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
// local
import EventItem from '_/containers/Events/components/EventItem'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { IEvent } from '_/model/event'
import { AuthContext } from '_/context'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: theme.spacing(80),
  },
  cell: {
    fontWeight: 'bold',
  },
}))

interface IProps {
  events: IEvent[]
  handleOpenDetails: (id: string) => void
}

const EventsList: React.FC<IProps> = ({ events, handleOpenDetails }) => {
  // context
  const { userId } = React.useContext(AuthContext)

  // styles
  const classes = useStyles()

  // state
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, events.length - page * rowsPerPage)

  const eventItems = events
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((el: IEvent) => (
      <EventItem
        key={el._id}
        isOwner={el?.creator?._id === userId}
        handleOpenDetails={handleOpenDetails}
        {...el}
      />
    ))

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.cell}> ID </TableCell>
              <TableCell className={classes.cell}> Title </TableCell>
              <TableCell className={classes.cell}> Creator email </TableCell>
              <TableCell className={classes.cell}> Date </TableCell>
              <TableCell className={classes.cell}> Price </TableCell>
              <TableCell className={classes.cell}> Description </TableCell>
              <TableCell className={classes.cell}> Owner </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventItems}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={events.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default EventsList
