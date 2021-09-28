import Grid from '@material-ui/core/Grid'
import React from 'react'

import { SVG404 } from 'static/SVG'

import useStyles from './style'

const NotFound: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid justify="center" className={classes.container}>
      <SVG404 />
    </Grid>
  )
}

export default NotFound
