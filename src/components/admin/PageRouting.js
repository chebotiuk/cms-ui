import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import { Options } from './Options/Options'
import { Templates } from './Templates/Templates'
import { Blocks } from './Blocks/Blocks'
import { BlockUpdate } from './Blocks/BlockUpdate'
import { View } from '../core/View'
import { styles } from '../../hoc/styles'
import { spacing } from '../../styles/layout'
import { routes } from '../../routes'
import { Products } from './Products/Products'
import { ProductUpdate } from './Products/ProductUpdate'
import { Categories } from './Categories/Categories'
import { Users } from './Users/Users'
import { Preferences } from './Preferences/Preferences'
import { Account } from './Account/Account'

@styles({
  root: {
    padding: spacing.medium,
  }
})
export class PageRouting extends Component {
  render() {
    const { classes } = this.props

    return (
      <View className={classes.root} style={{ flexDirection: 'column' }}>
        <Switch>
          <Route path={routes.admin.products.root}
                 exact
                 component={Products} />
          <Route path={routes.admin.products.create}
                 component={ProductUpdate} />
          <Route path={routes.admin.products.update}
                 component={ProductUpdate} />
        </Switch>
        <Route path={routes.admin.categories}
               component={Categories} />
        <Route path={routes.admin.templates}
               component={Templates} />
        <Switch>
          <Route path={routes.admin.blocks.root}
                 exact
                 component={Blocks} />
          <Route path={routes.admin.blocks.create}
                 component={BlockUpdate} />
          <Route path={routes.admin.blocks.update}
                 component={BlockUpdate} />
        </Switch>
        <Route path={routes.admin.options}
               component={Options} />
        <Route path={routes.admin.users}
               component={Users} />
        <Route path={routes.admin.preferences}
               component={Preferences} />
        <Route path={routes.admin.account}
               component={Account} />
      </View>
    )
  }
}
