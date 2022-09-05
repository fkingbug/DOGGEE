import React from 'react'
import { IntlContext } from '../context'

export const useIntl = () => {
  const intl = React.useContext(IntlContext)
  return intl
}
