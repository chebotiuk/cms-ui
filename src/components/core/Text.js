import React from 'react'
import PropTypes from 'prop-types'

export const Text = ({ children, ...rest }) => (
  <span {...rest}>
    {children}
  </span>
)

Text.propTypes = {
  nodeRef: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}
