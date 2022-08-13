export const getError = (description: string, cause?: string): Error => {
  const errorOptions: ErrorOptions = { cause: new Error(cause) }
  return new Error(description, cause ? errorOptions : undefined)
}
