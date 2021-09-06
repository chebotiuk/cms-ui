import React from 'react'
import PropTypes from 'prop-types'

export const View = ({ children, nodeRef, style, ...rest }) => (
  <div style={{ display: 'flex', ...style }}
       ref={nodeRef}
       {...rest}>
    {children}
  </div>
)

View.propTypes = {
  nodeRef: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}
