interface IProps {
  set: (key: string, value: string) => void
  get: (key: string) => string | null
  remove: (key: string) => void
  clear: () => void
}

const storage: IProps = {
  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    return (
      localStorage.getItem(key) &&
      JSON.parse(localStorage.getItem(key) as string)
    )
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
export default storage
