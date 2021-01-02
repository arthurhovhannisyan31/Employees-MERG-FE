// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { PagingPanel, } from '@devexpress/dx-react-grid'
import TextField from '@material-ui/core/TextField'
import Pagination from '@material-ui/lab/Pagination'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
// helpers
import useStyles from './style'

type IProps = PagingPanel.ContainerProps

const CustomPagingPanel: React.FC<IProps> = ({
  pageSize,
  pageSizes,
  onPageSizeChange,
  currentPage,
  onCurrentPageChange,
  // totalPages,
  totalCount,
}) => {
  const classes = useStyles()

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    onCurrentPageChange(value - 1)
  }
  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCurrentPageChange(0)
    onPageSizeChange((event.target.value as never) as number)
  }

  const rangeStart = currentPage === 0 ? 1 : currentPage * pageSize
  const getRangeEnd = () => {
    if (currentPage === 0) {
      return pageSize
    }
    return pageSize * (currentPage + 1) > totalCount ?
      totalCount :
      pageSize * (currentPage + 1)
  }
  const rangeEnd = getRangeEnd()

  const pageCount = Math.ceil(totalCount / pageSize)

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item>
        <Grid item container alignItems="center">
          <Typography className={classes.paginationLabel}>
            Rows per page:
          </Typography>
          <TextField
            id="select-rows-per-page"
            select
            value={pageSize}
            onChange={handleChangePageSize}
            InputProps={{ disableUnderline: true, }}
          >
            {pageSizes.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>
          {rangeStart}-{rangeEnd} of {totalCount}
        </Typography>
      </Grid>
      <Grid item>
        <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  )
}

export default CustomPagingPanel
