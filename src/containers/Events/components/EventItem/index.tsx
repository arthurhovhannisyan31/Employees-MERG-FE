// deps
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
// local
import { IEvent } from '_/model/event'

const useStyles = makeStyles(() => ({
  container: {},
}))

interface IProps extends IEvent {
  isOwner: boolean
  handleOpenDetails: (id: string) => void
}

const EventItem: React.FC<IProps> = ({
  _id,
  creator,
  date,
  description,
  price,
  title,
  isOwner,
  handleOpenDetails,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDetails = () => {
    handleOpenDetails(_id)
  }

  return (
    <>
      <TableRow className={classes.container}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {_id}
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{creator?.email}</TableCell>
        <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
        <TableCell>${price}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{isOwner ? 'You are the owner' : creator?.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container direction="row">
                <Button
                  onClick={handleDetails}
                  color="secondary"
                  variant="outlined"
                >
                  Open details
                </Button>
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      date
                    </TableCell>
                    <TableCell>customerId</TableCell>
                    <TableCell align="right">amount</TableCell>
                    <TableCell align="right">amount * price</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default EventItem
