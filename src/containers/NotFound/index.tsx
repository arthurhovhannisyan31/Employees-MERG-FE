import Grid from '@material-ui/core/Grid'
import React, { FC } from 'react'

import { SVG404 } from 'static/SVG'

import useStyles from './style'

const NotFound: FC = () => {
  const classes = useStyles()
  return (
    <Grid justifyContent="center" className={classes.container}>
      <SVG404 />
    </Grid>
  )
}

export default NotFound
