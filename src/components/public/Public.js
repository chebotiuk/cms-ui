import { withProps } from 'recompose'
import React, { Component, Fragment } from 'react'
import { BreadcrumbsItem, BreadcrumbsStateless } from '@atlaskit/breadcrumbs'

import { PageRouting } from './PageRouting'
import { PublicHeader, headerHeight } from './PublicHeader'
import { PublicSubheader, subheaderHeight } from './PublicSubheader'
import { PublicFooter } from './PublicFooter'

import { white } from '../../styles/colors'
import { styles } from '../../hoc/styles'
import { spacing } from '../../styles/layout'
import { typography } from '../../styles/typography'
import { breadcrumbsParserMemoized } from '../../lib/helpers'
import { View } from '../core/View'

@styles({
  contextMenuIcon: {
    cursor: 'pointer',
  },
  logo: { margin: '0 15px 0 5px' },
  contextMenu: { marginLeft: 'auto' },
  text: { extend: typography.regularMedium },
  logoText: { extend: typography.boldBig, color: white },
  subHeader: {
    paddingTop: headerHeight + subheaderHeight + spacing.medium,
    padding: [spacing.small, spacing.medium],
    extend: typography.semiBoldSmall,
  },
})
@withProps(({ location: { pathname } }) => ({
  breadcrumbs: breadcrumbsParserMemoized(pathname, item => item),
}))
export class Public extends Component {

  render() {
    const { classes, breadcrumbs } = this.props

    return (
      <Fragment>
        <PublicHeader />
        <PublicSubheader />
        <View className={classes.subHeader}
              style={{ flex: 'none' }}>
          <BreadcrumbsStateless>
            {breadcrumbs.map(({ href, text }) => (
              <BreadcrumbsItem
                key={href}
                href={href}
                text={text}
              />
            ))}
          </BreadcrumbsStateless>
        </View>
        <PageRouting />
        <PublicFooter />
      </Fragment>
    )
  }
}
