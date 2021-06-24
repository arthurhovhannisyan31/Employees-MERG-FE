export const checkResponse = (status: number): void => {
  if (![200, 201].includes(status)) {
    throw new Error('Failed!')
  }
}
