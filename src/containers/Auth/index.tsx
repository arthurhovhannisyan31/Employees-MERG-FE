import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  FC,
  ChangeEvent,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'

import TabPanel from 'components/UI/TabPanel'
import SignUp from 'containers/Auth/components/SignUp'
import SignIn from 'containers/Auth/components/SingIn'
import { AuthContext } from 'context'
import { a11yProps } from 'utils/a11y'

import { AuthContextActions } from 'model/context/auth'

import useStyles from './style'

const Auth: FC = () => {
  const history = useHistory()
  const { next = '' } = useParams<Record<'next', string>>()
  const {
    dispatch,
    userCredentials,
    errors: authErrors,
  } = useContext(AuthContext)

  const [tab, setTab] = useState(0)

  const classes = useStyles({ hasError: !!authErrors?.length })

  const clearErrors = useCallback(() => {
    dispatch({
      type: AuthContextActions.ERRORS,
      payload: { errors: [] },
    })
  }, [dispatch])

  const handleChange = useCallback(
    (_: ChangeEvent<Record<string, never>>, newValue: number) => {
      clearErrors()
      setTab(newValue)
    },
    [clearErrors],
  )

  const redirectOnAuth = useCallback(() => {
    if (userCredentials?._id) {
      history.push(`/${next}`)
    }
  }, [history, next, userCredentials])

  useEffect(redirectOnAuth, [redirectOnAuth])

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid>
        <AppBar position="static" color="transparent">
          <Tabs
            indicatorColor="primary"
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Sign In" {...a11yProps('sign in')} />
            <Tab label="Sign Up" {...a11yProps('sign up')} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          <SignIn />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SignUp />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default Auth
