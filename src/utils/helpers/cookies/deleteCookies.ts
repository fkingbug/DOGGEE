import { setCookies } from './setCookies'

export const deleteCookies = (name: string) => {
  setCookies(name, null, { expires: -1 })
}
