import React from 'react'
import PropTypes from 'prop-types'

import { View } from './View'

export const ScrollableView = ({ vertical, style, children, ...rest }) => (
  <View style={{
        ...style,
        ...(vertical ? { overflowY: 'auto', flexDirection: 'column' } : { overflowX: 'auto' })
      }}
      {...rest}>
    {children}
  </View>
)

ScrollableView.propTypes = {
  ...View.propTypes,
  vertical: PropTypes.bool
}
