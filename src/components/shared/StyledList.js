import React, { Component } from 'react'

import { styles } from '../../hoc/styles'
import { typography } from '../../styles/typography'
import { dark } from '../../styles/colors'
import { spacing } from '../../styles/layout'
import { Text } from '../core/Text'
import { ListView } from '../core/ListView'

@styles({
  listItemText: {
    extend: typography.regularMedium,
    color: dark,
    marginBottom: spacing.small,
  },
})
export class StyledList extends Component {
  renderRow = (text, i) => (
    <Text className={this.props.classes.listItemText}
          key={i}>
      {text}
    </Text>
  )

  render() {
    const { renderRow = this.renderRow } = this.props

    return (
      <ListView renderRow={renderRow}
                {...this.props} />
    )
  }
}
