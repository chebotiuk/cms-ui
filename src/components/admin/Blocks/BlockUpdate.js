import React, { PureComponent } from 'react'

import { View } from '../../core/View'
import { BlockUpdateForm } from './BlockUpdateForm'

export class BlockUpdate extends PureComponent {
  render() {
    const {
      location: { state = {} },
      match: { params: { id } },
    } = this.props

    return (
      <View style={{ flexDirection: 'column' }}>
        <BlockUpdateForm updateById={id}
                         duplicateById={state.id} />
      </View>
    )
  }
}
