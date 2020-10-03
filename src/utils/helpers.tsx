// deps
// local

export const regExp = {
  phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  zipCode: /^[0-9]{5}([- /]?[0-9]{4})?$/,
  vinNumber: /^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$/,
  numbers: /^\d+$/,
}

export const useFileUploadSizeValidation = (arr: any[], limit: number) => {
  if (!arr.length || !limit) return false
  const invalid = arr.filter((el) => {
    return el.size / (1024 * 1024) > limit
  })
  return [!invalid.length, invalid]
}

export const fetchResponseCheck = (status: number) => {
  if (![200, 201].includes(status)) {
    throw new Error('Failed!')
  }
}

export const useFileUploadFormatValidation = (
  arr: any[],
  excludedFormats: string[]
) => {
  if (!arr.length || !excludedFormats.length) return false
  const invalid = arr.filter((el) =>
    excludedFormats.includes(el.type.split('/')[0])
  )
  return [!invalid.length, invalid]
}

export const getBase64 = async (file: any) => {
  const reader = new FileReader()
  await reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = (_) => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const fileFormats = {
  images: [
    'apng',
    'bmp',
    'gif',
    'ico',
    'cur',
    'jpg',
    'jpeg',
    'jfif',
    'pjpeg',
    'pjp',
    'png',
    'svg',
    'tif',
    'tiff',
    'webp',
  ],
}
