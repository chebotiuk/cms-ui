import React from 'react'

import { useLocalization } from '../localization/localizationLoader'

export const localizationLoader = page => Component => props => {
  const [ localization ] = useLocalization(page)

  if (localization === null) return null

  return <Component {...props} localization={localization} />
}
