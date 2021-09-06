import React, { PureComponent } from 'react'
import AtlaskitButton from '@atlaskit/button'

import { styles } from '../../hoc/styles'
import { systemFontSize } from '../../styles/typography'
import { View } from '../core/View'

@styles({
  button: {
    fontSize: systemFontSize,
  }
})
export class Button extends PureComponent {
  render() {
    const { className, classes } = this.props

    return (
      <View className={className || classes.button}>
        <AtlaskitButton {...this.props} />
      </View>
    )
  }
}
