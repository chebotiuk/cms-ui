import React, { Component } from 'react'
import { createUseStyles } from 'react-jss'
import MediaServicesGridIcon from '@atlaskit/icon/glyph/media-services/grid'
import ShipIcon from '@atlaskit/icon/glyph/ship'
import WorldIcon from '@atlaskit/icon/glyph/world'
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/arrow-right-circle'
import LabelIcon from '@atlaskit/icon/glyph/label'
import { withRouter } from 'react-router-dom'

import { primarySoft, primarySoftLight } from '../../styles/colors'
import { routes } from '../../routes'
import { styles } from '../../hoc/styles'
import { spacing, containerWidth } from '../../styles/layout'
import { typography } from '../../styles/typography'
import { passParams } from '../../lib/url'
import { light } from '../../styles/colors'
import { View } from '../core/View'
import { Text } from '../core/Text'

export const headerHeight = 51

const useNavbarItemStyles = createUseStyles({
  root: {
    cursor: 'pointer',
    color: light
  },
  text: { extend: typography.regularMedium },
})

function NavbarItem({ icon: Icon, text, onClick = () => {} }) {
  const classes = useNavbarItemStyles()

  return (
    <View onClick={onClick} style={{ alignItems: 'center' }} className={classes.root}>
      {Icon}
      &nbsp;
      <Text className={classes.text}>{text}</Text>
    </View>
  )
}

@withRouter
@styles({
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: headerHeight,
    backgroundColor: primarySoft,
    padding: spacing.medium,
    filter: `drop-shadow(0 0 5.75rem ${primarySoftLight})`,
    boxSizing: 'border-box',

    '& > *': {
      width: containerWidth.desktop,
      margin: '0 auto',
    }
  },
  contentItems: {
    '& > *': {
      marginRight: spacing.big
    }
  },
  logoSection: {
    cursor: 'pointer'
  },
  textLogo: { extend: typography.semiBoldHuge, color: light },
  text: { extend: typography.regularSmall, color: light },
})
export class PublicHeader extends Component {
  // to-do: Refactor whole module due to standartization

  navBarItems = [
    {
      icon: <LabelIcon />,
      text: "Каталог",
      onClick: () => {
        this.props.history.push(routes.public.products.root)
      }
    },
    {
      icon: <ArrowRightCircleIcon secondaryColor={primarySoft} />,
      text: "Як замовити?",
      onClick: () => {
        this.props.history.push(passParams(routes.public.info, { page: 'how_to_order' }))
      }
    },
    {
      icon: <ShipIcon />,
      text: "Доставка та оплата",
      onClick: () => {
        this.props.history.push(passParams(routes.public.info, { page: 'delivery' }))
      }
    },
    {
      icon: <WorldIcon />,
      text: "Контакти",
      onClick: () => {
        this.props.history.push(passParams(routes.public.info, { page: 'contacts' }))
      }
    },
    {
      icon: <MediaServicesGridIcon />,
      text: "Оптовi замовлення",
      onClick: () => {
        this.props.history.push(passParams(routes.public.info, { page: 'partners' }))
      }
    },
  ]

  render() {
    const { classes } = this.props

    return (
      <View className={classes.root} style={{ alignItems: 'center' }}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }} className={classes.logoSection} onClick={() => this.props.history.push('/')}>
            <Text className={classes.textLogo}>METAKAM</Text>
            <Text className={classes.text}>Металлевi лiжка вiд виробника</Text>
          </View>
          <View className={classes.contentItems}>
            {this.navBarItems.map((props, i) =>
              <NavbarItem {...props} key={i} />
            )}
          </View>
        </View>
      </View>
    )
  }
}
