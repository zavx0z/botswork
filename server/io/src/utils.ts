import jwtDecode from "jwt-decode";


export const getDecodedAccessToken = (token: string): any => {
  try {
    return jwtDecode(token)
  } catch (Error) {
    return null
  }
};export const parseCookie = (str: string) => str
  .split(";")
  .map((v) => v.split("="))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
    return acc
  }, {} as { [key: string]: string} )

