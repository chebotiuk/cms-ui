import { defaultProps } from 'recompose'
import React, { Component } from 'react'

import { styles } from '../../hoc/styles'
import { muted } from '../../styles/colors'
import { View } from '../core/View'

@defaultProps({
  color: muted,
})
@styles({
  vertical: {
    borderRight: ({ color }) => `1px solid ${color}`,
  },
  horizontal: {
    borderBottom: ({ color }) => `1px solid ${color}`,
  }
})
export class Separator extends Component {
  render() {
    const { classes, vertical } = this.props

    return (
      <View className={vertical ? classes.vertical : classes.horizontal} />
    )
  }
}
