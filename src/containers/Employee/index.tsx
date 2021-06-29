import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import React, {
  FC,
  useCallback,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
} from 'react'
import { useParams } from 'react-router-dom'

import TabPanel from 'components/UI/TabPanel'
import Details from 'containers/Employee/components/Details'
import DetailsModal from 'containers/Employee/components/DetailsModal'
import Employments from 'containers/Employee/components/Employments'
import Paychecks from 'containers/Employee/components/Paychecks'
import Titles from 'containers/Employee/components/Titles'
import {
  useSubmitEmployeeModal,
  useGetEmployee,
} from 'containers/Employee/hooks'
import { useGetDepartments } from 'containers/Employee/hooks/useGetDepartments'
import { useGetTitles } from 'containers/Employee/hooks/useGetTitles'
import { useGetGenders } from 'containers/Employee/hooks/useGetGenders'
import { a11yProps } from 'utils/a11y'
import useStyles from './style'

const EmployeePage: FC = () => {
  const classes = useStyles()
  const { id: idParam } = useParams<Record<'id', string>>()
  const {
    state: {
      data: employeeByIdData,
      loading: employeeByIdLoading,
      error: employeeByIdError,
    },
    dispatch: employeeByIdDispatch,
  } = useContext(EmployeeByIdContext)
  const {
    state: {
      data: { departments, titles, genders },
    },
    dispatch: catalogsDispatch,
  } = useContext(CatalogsContext)

  const [tab, setTab] = useState<number>(0)
  const employeeData = employeeByIdData?.[idParam]
  const [currentModal, setCurrentModal] = useState('')

  const handleChangeTab = useCallback(
    (_: ChangeEvent<Record<string, unknown>>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )
  const handleSetModal = useCallback(
    (val: string) => () => {
      setCurrentModal(val)
    },
    [],
  )

  const [handleGetEmployee] = useGetEmployee({
    dispatch: employeeByIdDispatch,
  })
  const [handleEmployeeSubmit] = useSubmitEmployeeModal({
    dispatch: employeeByIdDispatch,
  })
  const [handleGetDepartments] = useGetDepartments({
    dispatch: catalogsDispatch,
  })
  const [handleGetTitles] = useGetTitles({ dispatch: catalogsDispatch })
  const [handleGetGenders] = useGetGenders({ dispatch: catalogsDispatch })

  // todo update fields
  // todo add delete profile
  // todo error message

  const fetchEmployeeInitData = useCallback(() => {
    if (!employeeData && !employeeByIdLoading) {
      handleGetEmployee({ id: idParam })
    }
  }, [employeeData, employeeByIdLoading, handleGetEmployee, idParam])
  const fetchDepartmentsInitData = useCallback(() => {
    if (!departments?.length) {
      handleGetDepartments()
    }
  }, [departments, handleGetDepartments])
  const fetchTitlesInitData = useCallback(() => {
    if (!titles?.length) {
      handleGetTitles()
    }
  }, [handleGetTitles, titles])
  const fetchGendersInitData = useCallback(() => {
    if (!genders?.length) {
      handleGetGenders()
    }
  }, [genders, handleGetGenders])

  useEffect(fetchEmployeeInitData, [fetchEmployeeInitData])
  useEffect(fetchDepartmentsInitData, [fetchDepartmentsInitData])
  useEffect(fetchTitlesInitData, [fetchTitlesInitData])
  useEffect(fetchGendersInitData, [fetchGendersInitData])

  return (
    <Grid container item className={classes.container} direction="column">
      <Grid>
        {employeeByIdLoading && !employeeData ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          <>
            {employeeByIdError ? (
              <Typography>Error message</Typography>
            ) : (
              <>
                {currentModal === 'details' && (
                  <DetailsModal
                    isOpen={currentModal === 'details'}
                    handleClose={handleSetModal('')}
                    data={employeeData}
                    onSubmit={handleEmployeeSubmit}
                    titles={titles}
                    departments={departments}
                    isLoading={employeeByIdLoading}
                  />
                )}
                <AppBar position="static">
                  <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    aria-label="simple tabs employee"
                  >
                    <Tab label="Details" {...a11yProps(`employee-tab-${0}`)} />
                    <Tab
                      label="Paychecks"
                      {...a11yProps(`employee-tab-${1}`)}
                    />
                    <Tab label="Titles" {...a11yProps(`employee-tab-${2}`)} />
                    <Tab
                      label="Employments"
                      {...a11yProps(`employee-tab-${3}`)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={tab} index={0}>
                  <Details
                    handleOpenModal={handleSetModal('details')}
                    {...employeeData}
                  />
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
