// deps
import React from 'react'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
// components
import TabPanel from '_/components/TabPanel'
import Details from '_/containers/Employee/components/Details'
import Employments from '_/containers/Employee/components/Employments'
import Paychecks from '_/containers/Employee/components/Paychecks'
import Titles from '_/containers/Employee/components/Titles'
// model
import { GetEmployeeInput } from '_/model/generated/graphql'
import { TEmployeeFetchResponse } from '_/containers/Employee/types'
// helpers
import { AuthContext } from '_/context/auth-context'
import { getEmployee } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/helpers'
import { a11yProps } from './helpers'
import useStyles from './style'

const EmployeePage: React.FC = () => {
  // styles
  const classes = useStyles()
  // context
  const { headers } = React.useContext(AuthContext)
  // state
  const [tab, setTab] = React.useState<number>(0)
  // callback
  const handleChangeTab = React.useCallback(
    (_: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )
  // memo
  const apiUrl = React.useMemo<string>(() => process?.env?.API_URL || '', [])
  const handleGetEmployee = async ({ id }: GetEmployeeInput) => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getEmployee({ id })),
        headers,
      })
      fetchResponseCheck(res?.status)
      const {
        data: {
          employee: { _id: employeeId },
        },
      }: TEmployeeFetchResponse = await res.json()
      console.log(employeeId)
    } catch (err) {
      // dispatch err
    }
  }

  // todo employee reducer mb with employees
  // todo update fields and delete profile

  React.useEffect(() => {
    handleGetEmployee({ id: '5f6a3d5a4636e1543f6d4452' })
    // eslint-disable-next-line
  }, [])

  const loading = false
  return (
    <Grid container item className={classes.container} direction="column">
      <Grid>
        {loading ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
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
              <Details />
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
      </Grid>
    </Grid>
  )
}

export default EmployeePage
