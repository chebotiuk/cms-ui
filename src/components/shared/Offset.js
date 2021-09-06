import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { styles } from '../../hoc/styles'
import { spacing } from '../../styles/layout'
import { View } from '../core/View'

@styles({
  horizontal: {
    width: ({ spacing: str }) =>  spacing[str]
  },
  vertical: {
    height: ({ spacing: str }) =>  spacing[str]
  },
})
export class Offset extends Component {
  static propTypes = {
    spacing: PropTypes.oneOf([
      'small',
      'medium',
      'big',
      'huge'
    ]),
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    spacing: 'medium',
  }

  render() {
    const { vertical, classes } = this.props

    return (
      <View className={vertical ? classes.vertical : classes.horizontal}
            style={{ flex: 'none' }} />
    )
  }
}
