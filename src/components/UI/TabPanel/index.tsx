import Box from '@material-ui/core/Box'
import React, { FC } from 'react'

interface IProps {
  value: number
  index: number
}

const TabPanel: FC<IProps> = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </div>
)

export default TabPanel
