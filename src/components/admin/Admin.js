import { Link, withRouter } from 'react-router-dom'
import { withProps } from 'recompose'
import React, { Component, PureComponent, Fragment } from 'react'
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu'
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle'
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical'
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs'

import { PageRouting } from './PageRouting'
import { styles } from '../../hoc/styles'
import { spacing, radius } from '../../styles/layout'
import { typography } from '../../styles/typography'
import {
  light,
  muted,
  primary,
  secondaryLight,
  white,
} from '../../styles/colors'
import { breadcrumbsParserMemoized } from '../../lib/helpers'
import { View } from '../core/View'
import { Text } from '../core/Text'
import { routes } from '../../routes'

@styles({
  root: {
    padding: `0 ${spacing.small}px`,
  },
  text: { extend: typography.regularMedium, color: light },
})
class HeaderItem extends PureComponent {
  render () {
    const { text, classes } = this.props

    return (
      <View className={classes.root}>
        <Text className={classes.text}>{text}</Text>
      </View>
    )
  }
}

@styles({
  header: {
    height: '30px',
    borderRadius: [0, 0, radius.solid, radius.solid],
    backgroundColor: primary,
    padding: spacing.medium,
    boxShadow: `0 0 10px ${muted}`,
  },
  contextMenuIcon: {
    cursor: 'pointer',
  },
  logo: { margin: '0 15px 0 5px' },
  contextMenu: { marginLeft: 'auto' },
  text: { extend: typography.regularMedium },
  logoText: { extend: typography.boldBig, color: white },
  subHeader: {
    padding: [spacing.small, spacing.medium],
    extend: typography.semiBoldSmall,
  },
})
@withRouter
@withProps(({ location: { pathname } }) => ({
  breadcrumbs: breadcrumbsParserMemoized(pathname, item => item),
}))
export class Admin extends Component {

  render() {
    const { classes, breadcrumbs } = this.props

    return (
      <Fragment>
        <View className={classes.header}
              style={{ alignItems: 'center', flex: 'none' }}>
          <CheckCircleIcon primaryColor={secondaryLight} />
          <View className={classes.logo}>
            <Link to={routes.admin.root}>
              <Text className={classes.logoText}>CMS</Text>
            </Link>
          </View>
          <Link to={routes.admin.products.root}>
            <HeaderItem text="Products" />
          </Link>
          <Link to={routes.admin.categories}>
            <HeaderItem text="Categories" />
          </Link>
          <Link to={routes.admin.templates}>
            <HeaderItem text="Templates" />
          </Link>
          <Link to={routes.admin.blocks.root}>
            <HeaderItem text="Blocks" />
          </Link>
          <Link to={routes.admin.options}>
            <HeaderItem text="Options" />
          </Link>
          <View className={classes.contextMenu}>
            <DropdownMenu
              trigger={
                <View className={classes.contextMenuIcon}>
                  <MoreVerticalIcon primaryColor={light} />
                </View>
              }
              shouldFlip={true}
              position="left top"
            >
              <DropdownItemGroup>
                <Link to={routes.admin.account}>
                  <DropdownItem>Account</DropdownItem>
                </Link>
                <Link to={routes.admin.users}>
                  <DropdownItem>Users</DropdownItem>
                </Link>
                <Link to={routes.admin.preferences}>
                  <DropdownItem>Preferences</DropdownItem>
                </Link>
              </DropdownItemGroup>
            </DropdownMenu>
          </View>
        </View>
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
      </Fragment>
    )
  }
}
