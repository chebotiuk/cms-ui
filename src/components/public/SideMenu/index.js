import {
  ButtonItem,
  Header,
  NavigationHeader,
  NestableNavigationContent,
  Section,
  SideNavigation,
} from '@atlaskit/side-navigation'
import React, { Component } from 'react'

import { View } from '../../core/View'
import { styles } from '../../../hoc/styles'
import { consumeContext } from '../../../hoc/context'
import { fetchData } from '../../../hoc/fetchData'
import { api } from '../../../api'
import { localizationLoader } from '../../../hoc/localizationLoader'
import { radius } from '../../../styles/layout'
import { primarySoft } from '../../../styles/colors'

@localizationLoader('root')
@consumeContext('searchParamsContext')
@fetchData({
  categories: () => api.get('/categories')
})
@styles({
  root: {
    overflow: 'hidden',
    borderRadius: radius.light,

    '& span': { color: primarySoft }
  }
})
export class SideMenu extends Component {
  render () {
    const { data: { categories }, searchParamsContext: { searchParams, setSearchParams }, localization, classes } = this.props

    return (
      <View className={classes.root}>
        <SideNavigation label="project">
          <NavigationHeader>
            <Header>{localization.side_nav_categories}</Header>
          </NavigationHeader>
          <NestableNavigationContent>
            <Section>
              {categories.map(({ name }) => (
                <ButtonItem isSelected={
                              searchParams.get('filter') && JSON.parse(searchParams.get('filter')).category === name
                            }
                            onClick={() => setSearchParams(
                              'filter',
                              JSON.stringify({ category: name })
                            )}
                            key={name}>
                  {name}
                </ButtonItem>
              ))}
            </Section>
          </NestableNavigationContent>
        </SideNavigation>
      </View>
    )
  }
}
