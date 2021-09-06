import React, { Component } from 'react'
import AddIcon from '@atlaskit/icon/glyph/add'

import { styles } from '../../hoc/styles'
import { typography } from '../../styles/typography'
import { secondary } from '../../styles/colors'
import { View } from '../core/View'
import { Text } from '../core/Text'

@styles({
  root: {
    cursor: 'pointer',
  },
  text: { extend: typography.semiBoldBig, color: secondary },
})
export class AddNewButton extends Component {
  render() {
    const { classes, onClick } = this.props

    return (
      <View className={classes.root}
                onClick={onClick}>
        <AddIcon primaryColor={secondary}
                 size="small" />
        <Text className={classes.text}>Add new</Text>
      </View>
    )
  }
}
