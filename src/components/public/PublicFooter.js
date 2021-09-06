import React, { Component } from 'react'
import HipchatDialOutIcon from '@atlaskit/icon/glyph/hipchat/dial-out'
import DiscoverIcon from '@atlaskit/icon/glyph/discover'
import SendIcon from '@atlaskit/icon/glyph/send'

import { muted, interactive } from '../../styles/colors'
import { styles } from '../../hoc/styles'
import { spacing, containerWidth } from '../../styles/layout'
import { typography } from '../../styles/typography'
import { View } from '../core/View'
import { Text } from '../core/Text'
import { Offset } from '../shared/Offset'
import map_location_img from '../../images/location_map.png'

const footerHeight = 300

@styles({
  root: {
    position: 'absolute',
    bottom: -footerHeight - spacing.huge,
    left: '0',
    width: '100%',
    height: footerHeight,
    backgroundColor: muted,
    padding: [spacing.big, spacing.medium],
    boxSizing: 'border-box',

    '& > *': {
      width: containerWidth.desktop,
      margin: '0 auto',
    },
  },
  label: { extend: typography.regularBig, color: interactive },
  labelText: { extend: typography.regular, color: interactive },
})
export class PublicFooter extends Component {

  render() {
    const { classes } = this.props

    return (
      <View className={classes.root}>
        <View>
          <View style={{ flex: '1 1 0' }} />
          <View style={{ flexDirection: 'column', flex: '1 1 0' }}>
            <View style={{ alignItems: 'center' }} className={classes.label}>
              <HipchatDialOutIcon />&nbsp; Контакти:
            </View>
            <Offset spacing="medium" vertical />
            <View style={{ flexDirection: 'column' }}>
              <Text className={classes.labelText}>(050) 482-20-98</Text>
              <Offset spacing="small" vertical />
              <Text className={classes.labelText}>(067) 761-99-43</Text>
              <Offset spacing="small" vertical />
              <Text className={classes.labelText}>(073) 454-86-72</Text>
            </View>
            <Offset spacing="big" vertical />
            <View style={{ alignItems: 'center' }} className={classes.label}>
              <DiscoverIcon />&nbsp; Адреса: <br />
            </View>
            <Offset spacing="medium" vertical />
            <Text className={classes.labelText}>м Київ вул. Бориспільська 9 (склад)</Text>
            <Offset spacing="big" vertical />
            <View style={{ alignItems: 'center' }} className={classes.label}>
              <SendIcon />&nbsp; Поштова скринька: <br />
            </View>
            <Offset spacing="medium" vertical />
            <a href="mailto: shop@metakam.com.ua">shop@metakam.com.ua</a>
          </View>
          <View style={{ flexDirection: 'column', flex: '1 1 0' }}>
            <a href="https://goo.gl/maps/nLZ3R96TBjFNmyvg8" target="_blank">
              <img alt="location" src={map_location_img} style={{ maxWidth: '100%' }} />
            </a>
          </View>
          <View spacing="medium" style={{ flex: '1 1 0' }} />
        </View>
      </View>
    )
  }
}
