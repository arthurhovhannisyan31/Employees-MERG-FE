export function a11yProps(index: number): Record<string, string> {
  return {
    id: `employee-tab-${index}`,
    'aria-controls': `employee-tabpanel-${index}`,
  }
}
