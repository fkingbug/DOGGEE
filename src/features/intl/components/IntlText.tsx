import React from 'react'

import { useIntl } from '@features'

interface IntlTextProps {
  path: string
}

export const IntlText: React.FC<IntlTextProps> = ({ path }) => {
  const intl = useIntl()
  return <>{intl.messages[path]}</>
}
