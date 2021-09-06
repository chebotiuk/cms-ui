import React, { PureComponent } from 'react'
import { FieldTextStateless } from '@atlaskit/field-text'

import { Offset } from '../../../shared/Offset'
import { View } from '../../../core/View'

function marginRatioConverter(value) {
  if (isNaN(+value)) return 1
  return value
}

export class PriceInput extends PureComponent {
  onKeyDown = (e) => {
  console.log(e)
    if (e.key === 'Enter') {
      this.props.onSubmit()
    }
  }

  render() {
    const {
      keyName,
      wholesalePrice,
      price,
      marginRatio,
      hideLabels,
      onKeyChange,
      onWholesalePriceChange,
      onMarginRatioChange,
      onPriceChange
    } = this.props

    return (
      <View>
        <FieldTextStateless
          label="key"
          isLabelHidden={hideLabels}
          onChange={e =>  { onKeyChange(e.target.value ) }}
          onKeyDown={this.onKeyDown}
          value={keyName}
        />
        <Offset spacing="small" />
        <FieldTextStateless
          type="number"
          label="Wholesale Price"
          isLabelHidden={hideLabels}
          onChange={e => { onWholesalePriceChange(+e.target.value) }}
          onKeyDown={this.onKeyDown}
          value={wholesalePrice + ''}
        />
        <Offset spacing="small" />
        <FieldTextStateless
          label="Margin Ratio"
          type="number"
          isLabelHidden={hideLabels}
          onChange={e => {
            onMarginRatioChange(
              marginRatioConverter(e.target.value)
            )
          }}
          onKeyDown={this.onKeyDown}
          value={marginRatio}
        />
        <Offset spacing="small" />
        <FieldTextStateless
          type="number"
          label="Price"
          isLabelHidden={hideLabels}
          onChange={e => {
            onPriceChange((+e.target.value).toFixed()) }
          }
          onKeyDown={this.onKeyDown}
          value={price}
        />
      </View>
    )
  }
}
