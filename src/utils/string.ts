export const getFirstLastNameLetters = (str1?: string, str2?: string): string =>
  `${str1?.[0] || ''}${str2?.[0] || ''}`
