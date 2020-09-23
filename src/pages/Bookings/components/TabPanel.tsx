// deps
import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// local

interface IProps {
  value: number
  index: number
}

const TabPanel: React.FC<IProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default TabPanel
