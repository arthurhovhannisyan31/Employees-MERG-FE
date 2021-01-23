// deps
import React from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
// components
import TabPanel from '_/components/UI/TabPanel'
import Details from '_/containers/Employee/components/Details'
import Employments from '_/containers/Employee/components/Employments'
import Paychecks from '_/containers/Employee/components/Paychecks'
import Titles from '_/containers/Employee/components/Titles'
// model
import { GetEmployeeInput } from '_/model/generated/graphql'
import { TEmployeeFetchResponse } from '_/containers/Employee/types'
// helpers
import { EmployeeByIdContext } from '_/context'
import { AuthContext } from '_/context/auth-context'
import { getEmployee } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/auth'
import { a11yProps } from './helpers'
import useStyles from './style'

const EmployeePage: React.FC = () => {
  // utils
  const classes = useStyles()
  const { id: idParam } = useParams<Record<'id', string>>()
  const apiUrl = React.useMemo<string>(() => process?.env?.API_URL || '', [])
  // context
  const { headers } = React.useContext(AuthContext)
  const { dispatch, state } = React.useContext(EmployeeByIdContext)
  const { data, loading, error } = state
  // state
  const [tab, setTab] = React.useState<number>(0)
  const employeeData = data?.[idParam]
  // memo
  const handleChangeTab = React.useCallback(
    (_: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )
  const handleGetEmployee = React.useCallback(
    async ({ id }: GetEmployeeInput) => {
      dispatch({
        type: 'loading',
        payload: { loading: true },
      })
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(getEmployee({ id })),
          headers,
        })
        fetchResponseCheck(res?.status)
        const {
          data: { employee },
        }: TEmployeeFetchResponse = await res.json()
        dispatch({
          type: 'data',
          payload: {
            data: employee,
            key: idParam,
          },
        })
      } catch (err) {
        dispatch({
          type: 'error',
          payload: { error: err },
        })
      }
      dispatch({
        type: 'loading',
        payload: { loading: false },
      })
    },
    [apiUrl, dispatch, headers, idParam],
  )

  // todo update fields and delete profile
  // todo error message

  React.useEffect(() => {
    if (!employeeData) {
      handleGetEmployee({ id: idParam })
    }
  }, [idParam, handleGetEmployee, employeeData])

  return (
    <Grid container item className={classes.container} direction="column">
      <Grid>
        {loading ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          <>
            {error ? (
              <Typography>Error message</Typography>
            ) : (
              <>
                <AppBar position="static">
                  <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    aria-label="simple tabs employee"
                  >
                    <Tab label="Details" {...a11yProps(0)} />
                    <Tab label="Paychecks" {...a11yProps(1)} />
                    <Tab label="Titles" {...a11yProps(2)} />
                    <Tab label="Employments" {...a11yProps(3)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={tab} index={0}>
                  <Details {...employeeData} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <Paychecks />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <Titles />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                  <Employments />
                </TabPanel>
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default EmployeePage
