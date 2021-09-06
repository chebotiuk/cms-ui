import React, { Component, Fragment } from 'react'
import update from 'immutability-helper'

import PropTypes from 'prop-types'

import { styles } from '../../../../hoc/styles'
import { spacing } from '../../../../styles/layout'
import { typography } from '../../../../styles/typography'
import { interactiveLight } from '../../../../styles/colors'
import { View } from '../../../core/View'
import { ListView } from '../../../core/ListView'
import { Button } from '../../../shared/Button'
import { SubmittablePriceInput } from './SubmittablePriceInput'
import { EditablePriceInput } from './EditablePriceInput'

@styles({
  horizontalOffset: {
    width: spacing.small,
  },
  verticalOffset: {
    height: spacing.small,
  },
  labelText: {
    extend: typography.regularMedium,
    color: interactiveLight,
  }
})
export class PriceList extends Component {
  static propTypes = {
    priceList: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      wholesalePrice: PropTypes.number,
      marginRatio: PropTypes.string,
      price: PropTypes.number
    })),
  }

  state = {
    open: false
  }

  toggleAddNewOptionInput = () => {
    this.setState({
      open: !this.state.open
    })
  }

  addItem = (item) => {
    const { onChange, priceList } = this.props
    const updatedPriceList = update(priceList, { $push: [item] })

    onChange(updatedPriceList)
  }

  editItem = (item, i) => {
    const { onChange, priceList } = this.props
    const updatedPriceList = update(priceList, { [i]: { $set: item } })

    onChange(updatedPriceList)
  }

  deleteItem = (i) => {
    const { onChange, priceList } = this.props
    const updatedPriceList = update(priceList, { $splice: [[i, 1]] })

    onChange(updatedPriceList)
  }

  render() {
    const { priceList, classes } = this.props
    const { open } = this.state

    return (
      <View style={{ flexDirection: 'column' }}>
        <ListView dataSource={ priceList }
                  renderRow={({ key, wholesalePrice, marginRatio, price, accountedPrice }, i) => (
                    <Fragment key={i}>
                      <EditablePriceInput hideLabels={priceList.length !== 0}
                                          onSubmit={value => { this.editItem(value, i) }}
                                          onDelete={value => { this.deleteItem(i) }}
                                          key={key}
                                          keyValue={key}
                                          wholesalePrice={wholesalePrice}
                                          marginRatio={marginRatio}
                                          price={price}
                                          accountedPrice={accountedPrice} />
                      <View className={classes.verticalOffset} />
                    </Fragment>
                  )} />
                  <Button
                    appearance="link"
                    onClick={this.toggleAddNewOptionInput}
                  >
                    {open ? 'Hide' : 'Add new item'}
                  </Button>
                  {open && (
                    <SubmittablePriceInput hideLabels={priceList.length !== 0}
                                           onSubmit={this.addItem}
                                           onCancel={this.toggleAddNewOptionInput} />
                  )}
      </View>
    )
  }
}
