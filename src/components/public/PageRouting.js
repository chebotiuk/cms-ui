import { Redirect, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import { ProductPage } from './ProductPage'
import { InfoPage } from './InfoPage'
import { View } from '../core/View'
import ProductsPage from './ProductsPage'
import { routes } from '../../routes'
import { styles } from '../../hoc/styles'
import { spacing } from '../../styles/layout'

@styles({
  root: {
    padding: `0 ${spacing.medium}px`,
  }
})
export class PageRouting extends Component {
  render() {
    const { classes } = this.props

    return (
      <View className={classes.root} style={{ flexGrow: 1, flexDirection: 'column' }}>
        <Switch>
          <Redirect from='/' exact to={routes.public.products.root} />
          <Route path={routes.public.products.root}
                 exact
                 component={ProductsPage} />
          <Route path={routes.public.products.one}
                 component={ProductPage} />
          <Route path={routes.public.info}
                 component={InfoPage} />
        </Switch>
      </View>
    )
  }
}
