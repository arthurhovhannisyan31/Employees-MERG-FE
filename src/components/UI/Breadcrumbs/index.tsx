import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import React, { useCallback, useMemo, FC } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import useStyles from './style'

const BreadcrumbsComp: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const paths = useMemo(
    () => location?.pathname?.split('/').filter((el: string) => el),
    [location],
  )

  const handleHistory = useCallback(
    (str: string) => history.push(str),
    [history],
  )

  const links = paths.map((el: string, idx: number) => {
    if (idx + 1 === paths.length) {
      return (
        <Typography key={el} className={classes.link}>
          {el}
        </Typography>
      )
    }
    const path = idx === 0 ? el : paths.slice(0, idx + 1).join('/')
    return (
      <Button
        key={path}
        className={clsx(classes.link)}
        color="inherit"
        variant="text"
        onClick={() => handleHistory(`/${path}`)}
      >
        {el}
      </Button>
    )
  })

  return (
    <Grid container className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Button
          className={classes.link}
          color="inherit"
          variant="text"
          onClick={() => handleHistory('/')}
        >
          Home
        </Button>
        {links}
      </Breadcrumbs>
    </Grid>
  )
}

export default BreadcrumbsComp
