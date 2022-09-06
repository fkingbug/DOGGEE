import React from 'react'

import type { TranslateMessage } from '../hooks/useIntl'
import { useIntl } from '@features'

type IntlTextProps = TranslateMessage
export const IntlText: React.FC<IntlTextProps> = ({ path, values }) => {
  const intl = useIntl()
  return <>{intl.translateMessage(path, values)}</>
}
