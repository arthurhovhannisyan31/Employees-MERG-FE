export const fetchResponseCheck = (status: number) => {
  if (![200, 201].includes(status)) {
    throw new Error('Failed!')
  }
}
