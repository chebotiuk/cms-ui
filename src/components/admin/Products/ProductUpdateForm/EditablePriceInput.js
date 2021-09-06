import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { SubmittablePriceInput } from './SubmittablePriceInput'
import { View } from '../../../core/View'
import { Text } from '../../../core/Text'
import { Offset } from '../../../shared/Offset'
import { Button } from '../../../shared/Button'

const parsePrice = (wholesalePrice, marginRatio, price) =>
  price || ((wholesalePrice && marginRatio) ? wholesalePrice * marginRatio : null)

export class EditablePriceInput extends Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
  }

  state = {
    isEditing: false,
  }

  edit = () => {
    this.setState({
      isEditing: true
    })
  }

  delete = () => {
    const { onDelete } = this.props
    onDelete()
  }

  submit = value => {
    const { onSubmit } = this.props
    onSubmit(value)
    this.cancelEdit()
  }

  cancelEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const { keyValue, wholesalePrice, marginRatio, price, accountedPrice, hideLabels } = this.props
    const { isEditing } = this.state

    return isEditing 
      ? (
        <SubmittablePriceInput hideLabels={hideLabels}
                               onSubmit={this.submit}
                               onCancel={this.cancelEdit}
                               keyValue={keyValue}
                               wholesalePrice={wholesalePrice}
                               marginRatio={marginRatio}
                               price={price} />
      )
      : (
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
          <Text className="text">{keyValue}: {accountedPrice || parsePrice(wholesalePrice, marginRatio, price)}</Text>
          <Offset spacing="small" />
          <View>
            <Button appearance="primary"
                    onClick={this.edit}>
              Edit
            </Button>
            <Offset spacing="small" />
            <Button appearance="danger"
                    onClick={this.delete}>
              Delete
            </Button>
          </View>
        </View>
      )
  }
}
