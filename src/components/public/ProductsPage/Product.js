import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { Offset } from '../../shared/Offset'
import { Text } from '../../core/Text'
import { View } from '../../core/View'
import { api } from '../../../api'
import { secondary, muted } from '../../../styles/colors'
import { spacing, radius } from '../../../styles/layout'
import { styles } from '../../../hoc/styles'
import { typography } from '../../../styles/typography'
import BlankProductImg from '../../../images/blank_product.svg'
import sharedCSSRules from '../../../styles/sharedCSSRules'
import { Button } from '../../shared/Button'
import { routes } from '../../../routes';
import { passParams } from '../../../lib/helpers'
import { localizationLoader } from '../../../hoc/localizationLoader'

@localizationLoader('product')
@withRouter
@styles({
  root: {
    extend: sharedCSSRules.clickable,
    paddingBottom: spacing.big
  },
  image: {
    alignSelf: 'flex-start',
    width: '300px',
    borderRadius: radius.light,
    marginRight: spacing.big,
  },
  shortDescriptionText: {
    extend: [sharedCSSRules.ellipsisMultiline, typography.regularMedium],
    color: muted
  },
  nameText: {
    extend: typography.semiBoldHuge,
    fontSize: 21
  },
  priceText: {
    extend: typography.regularMedium,
    color: secondary
  },
  articleText: {
    extend: typography.semiBoldSmall,
    color: secondary
  },
  icon: {
    fontSize: 18
  }
})
export class Product extends Component {
  static defaultProps = {
    shortDescription: ''
  }

  goToProductPage = () => {
    this.props.history.push(passParams(routes.public.products.one, { id: this.props._id }))
  }

  get imgSrc() {
    return this.props.files.length !== 0
      ? api.baseUrl + '/uploads/' + 'sm_' + this.props.files[0].filename
      : BlankProductImg
  }

  stopPropagation = e => { e.stopPropagation() }

  render() {
    const { name, shortDescription, article, prices, onClick, classes, localization } = this.props

    return (
      <View className={classes.root} onClick={onClick}>
        <img src={this.imgSrc + '?size=300'} alt={name} className={classes.image} />
        <View style={{ flexDirection: 'column', flexGrow: 1 }}>
          <Text className={classes.nameText}>{name}</Text>
          <Offset vertical />
          <Text className={classes.articleText}>{localization.article} {article}</Text>
          <Offset vertical />
          {
            prices.length !== 0
              && prices.map(({ key, accountedPrice }) =>(
                <Fragment>
                  <Text className={classes.priceText}>
                    {(prices.length > 1 ? key : localization.price) + ': ' + accountedPrice + ' ' + localization.currency}
                  </Text>
                  <Offset spacing="small" vertical />
                </Fragment>
              ))
          }
          <Offset spacing="small" vertical />
          <Text className={classes.shortDescriptionText}>{shortDescription}</Text>
          <Offset vertical />
          <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginTop: 'auto' }}
                onClick={this.stopPropagation}>
            <Button onClick={this.goToProductPage}>
              {localization.view_more_btn} &nbsp;<span role="img" aria-label="view" className={classes.icon}>🔎</span>
            </Button>
            &nbsp;
            <Button onClick={this.goToProductPage} style={{ background: 'linear-gradient(to left, #EAECC6 0%, #b8deff 100%)' }}>
              {localization.make_order} &nbsp;<span role="img" aria-label="cart" className={classes.icon}>🛒</span>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
