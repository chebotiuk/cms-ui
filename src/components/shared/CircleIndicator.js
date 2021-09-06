import React, { PureComponent } from 'react'

import { styles } from '../../hoc/styles'
import { dangerLight, success } from '../../styles/colors'
import { View } from '../core/View'

@styles({
  root: {
    height: 10,
    width: 10,
    borderRadius: '50%',
    backgroundColor: ({ on }) => on ? success : dangerLight,
  },
})
export class CircleIndicator extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <View className={classes.root} />
    )
  }
}
