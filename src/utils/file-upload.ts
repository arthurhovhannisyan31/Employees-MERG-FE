export const useFileUploadSizeValidation = (
  arr: { type: string; size: number }[],
  limit: number,
): [boolean, { type: string }[]] | boolean => {
  if (!arr.length || !limit) return false
  const invalid = arr.filter((el) => el.size / (1024 * 1024) > limit)
  return [!invalid.length, invalid]
}

export const useFileUploadFormatValidation = (
  arr: { type: string }[],
  excludedFormats: string[],
): [boolean, { type: string }[]] | boolean => {
  if (!arr.length || !excludedFormats.length) return false
  const invalid = arr.filter((el) =>
    excludedFormats.includes(el.type.split('/')[0]),
  )
  return [!invalid.length, invalid]
}

export const getBase64 = async (
  file: never,
): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader()
  await reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
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
