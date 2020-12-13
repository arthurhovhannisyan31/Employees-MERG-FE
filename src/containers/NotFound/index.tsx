// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
// components
import { SVG404 } from '_/static/SVG'
// model
// helpers
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
