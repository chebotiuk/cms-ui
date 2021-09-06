import { defaultProps } from 'recompose'
import React, { PureComponent } from 'react'

import { styles } from '../../../hoc/styles'
import { muted } from '../../../styles/colors'
import { spacing } from '../../../styles/layout'
import { typography } from '../../../styles/typography'
import { View } from '../../core/View'
import { Separator } from '../../shared/Separator'
import { Text } from '../../core/Text'

@defaultProps({
  color: muted,
})
@styles({
  root: {
    padding: [spacing.medium, 0],
  },
  text: {
    extend: typography.regularMedium,
    color: ({ color }) => color
  }
})
export class Label extends PureComponent {
  render() {
    const { text, classes } = this.props

    return (
      <View className={classes.root}> 
        <Separator />
        <Text className={classes.text}>{text}</Text>
      </View>
    )
  }
}
