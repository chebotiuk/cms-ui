import React, { PureComponent } from 'react'

import { View } from '../../core/View'
import { ProductUpdateForm } from './ProductUpdateForm/ProductUpdateForm'

export class ProductUpdate extends PureComponent {
  render() {
    const {
      location: { state = {} },
      match: { params: { id } },
    } = this.props

    return (
      <View style={{ flexDirection: 'column' }}>
        <ProductUpdateForm updateById={id}
                           duplicateById={state.id} />
      </View>
    )
  }
}
