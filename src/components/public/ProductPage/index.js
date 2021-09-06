import { RadioGroup } from '@atlaskit/radio'
import { flattenProp } from 'recompose'
import ImageZoom from 'react-medium-image-zoom'
import React, { PureComponent } from 'react'
import Textfield from '@atlaskit/textfield'

import { BlockRenderer } from '../../shared/BlockRenderer'
import { Offset } from '../../shared/Offset'
import { Text } from '../../core/Text'
import { View } from '../../core/View'
import { api } from '../../../api'
import { fetchData } from '../../../hoc/fetchData'
import { iphone6Portrait } from '../../../styles/responsive'
import { localizationLoader } from '../../../hoc/localizationLoader'
import { primary, secondary } from '../../../styles/colors'
import { spacing } from '../../../styles/layout'
import { styles } from '../../../hoc/styles'
import { typography } from '../../../styles/typography'
import QuickPurchaseDialog from '../Dialogs/QuickPurchaseDialog'

@localizationLoader('product_id')
@styles({
  root: {
    [iphone6Portrait]: {
      margin: '0 auto'
    }
  },
  images: {
    '& > *': {
      width: '100px'
    },
    '& > *:first-child': {
      width: '100%'
    }
  },
  image: {
    borderRadius: '5px',
    marginRight: spacing.big,
    marginBottom: spacing.big,
    alignSelf: 'flex-start'
  },
  nameText: {
    extend: typography.semiBoldHuge,
    fontSize: 21
  },
  priceText: {
    extend: typography.semiBoldBig,
    color: primary
  },
  articleText: {
    extend: typography.semiBoldSmall,
    color: secondary
  }
})
@fetchData({
  product: ({ match: { params: { id } } }) => api.get('/products/:id', { params: { id } })
})
@flattenProp('data')
@flattenProp('product')
export class ProductPage extends PureComponent {
  state = {
    amount: 1,
    price: '',
  }

  files = this.props.files.map(({ filename }, i) => {
    const imgSrc = api.baseUrl + '/uploads/' + filename
    const imgAltText = this.props.name + ' image ' + i

    return (
      <ImageZoom image={{
                   src: imgSrc,
                   alt: imgAltText,
                   className: this.props.classes.image
                 }}
                 zoomImage={{
                   src: imgSrc,
                   alt: imgAltText
                 }}
                 key={imgSrc} />
    )
  })

  onAmountChange = e => {
    this.setState({
      amount: e.target.value
    })
  }

  onPriceChange = e => {
    this.setState({
      price: e.currentTarget.value
    })
  }

  render() {
    const { classes, _id: id, article, name, description, prices, localization } = this.props
    const { amount, price } = this.state

    return (
      <View className={classes.root}>
        <View style={{ flex: '40 0 0', flexWrap: 'wrap', alignContent: 'flex-start' }} className={classes.images} >
          {this.files}
        </View>
        <View style={{ flexDirection: 'column', flex: '60 0 0', paddingLeft: spacing.big }}>
          <Text className={classes.nameText}>{name}</Text>
          <Offset vertical />
          <Text className={classes.articleText}>{localization.article} {article}</Text>
          <Offset vertical />
          <RadioGroup
            isDisabled={this.state.isDisabled}
            options={prices.map(({ key, accountedPrice }) => ({
              name: 'key',
              value: key,
              label: key + ': ' + accountedPrice + ' ' + localization.currency,
            }))}
            onChange={this.onPriceChange}
          />
          <Offset vertical />
          <View style={{ alignItems: 'center' }}>
            <label htmlFor="xsmall">{localization.amount}</label>
            <Offset />
            <Textfield name="amount" width="xsmall" type="number" value={amount} onChange={this.onAmountChange} />
          </View>
          <View style={{ alignSelf: 'flex-end' }}
                onClick={e => { e.stopPropagation() }}>
            <QuickPurchaseDialog products={[{ id, name, article, price, additionalOptions: [], amount }]}>
              {localization.purchase}
            </QuickPurchaseDialog>
          </View>
          <Offset vertical />
          <BlockRenderer source={description} />
        </View>
      </View>
    )
  }
}
