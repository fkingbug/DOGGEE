export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props: any = {}
) => {
  const cookieOptions: any = {}

  if (typeof props.expires === 'number' && props.expires) {
    const date = new Date()
    date.setTime(date.getTime() + props.expires * 1000)
    cookieOptions.expires = date
  }

  if (props.expires && props.expires.toUTCString) {
    cookieOptions.expires = props.expires.toUTCString()
  }

  const cookieValue = encodeURIComponent(value)
  let updatedCookie = `${name}=${cookieValue}`
  Object.keys(cookieOptions).forEach(propName => {
    updatedCookie += `; ${propName}`

    const propValue = cookieOptions[propName]

    if (propValue !== true) {
      updatedCookie += `=${propValue}`
    }
  })

  document.cookie = updatedCookie
}
