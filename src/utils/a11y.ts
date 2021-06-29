export function a11yProps(str: string): Record<'id' & 'aria-controls', string> {
  return {
    id: str,
    'aria-controls': str,
  }
}
