import React, { PureComponent } from 'react'

import { PriceInput } from './PriceInput'
import { onClickOutside } from '../../../../hoc/onClickOutside'
import { View } from '../../../core/View'
import { Offset } from '../../../shared/Offset'
import { Button } from '../../../shared/Button'

@onClickOutside(({ onCancel }) => { onCancel() })
export class SubmittablePriceInput extends PureComponent {
  state = {
    key: this.props.keyValue || '',
    wholesalePrice: this.props.wholesalePrice || 0,
    marginRatio: this.props.marginRatio || '1',
    price: this.props.price || 0
  }

  resetState = () => {
    this.setState({
      key: '',
      wholesalePrice: 0,
      marginRatio: 1,
      price: 0,
    })
  }

  submit = () => {
    const { onSubmit } = this.props
    const { key, wholesalePrice, price, marginRatio } = this.state

    onSubmit({ key, wholesalePrice, price, marginRatio })
    this.resetState()
  }

  render () {
    const { key, wholesalePrice, price, marginRatio } = this.state
    const { hideLabels, setClickOutsideTargetRef, onCancel } = this.props

    return (
      <View style={{ alignItems: 'flex-end', flexGrow: 1 }}
                nodeRef={setClickOutsideTargetRef}>
        <PriceInput keyName={key}
                    hideLabels={hideLabels}
                    wholesalePrice={wholesalePrice}
                    marginRatio={marginRatio}
                    price={price}
                    onKeyChange={value =>  { this.setState({ key: value }) }}
                    onWholesalePriceChange={value => { this.setState({ wholesalePrice: value }) }}
                    onMarginRatioChange={value => { this.setState({ marginRatio: value }) }}
                    onPriceChange={value => { this.setState({ price: value }) }}
                    onSubmit={this.submit} />
        <Offset spacing="small" />
        <View>
          <Button appearance="primary"
                  onClick={this.submit}>
            Submit
          </Button>
          <Offset spacing="small" />
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </View>
      </View>
    )
  }
}
