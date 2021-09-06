import React, { Component } from 'react'
import { createUseStyles } from 'react-jss'
import HipchatDialOutIcon from '@atlaskit/icon/glyph/hipchat/dial-out'
import CheckCircleOutlineIcon from '@atlaskit/icon/glyph/check-circle-outline'
import EmojiFlagsIcon from '@atlaskit/icon/glyph/emoji/flags'

import { headerHeight } from './PublicHeader'
import { styles } from '../../hoc/styles'
import { spacing, containerWidth } from '../../styles/layout'
import { Offset } from '../shared/Offset'
import { typography } from '../../styles/typography'
import { light, primarySoftLight } from '../../styles/colors'
import { View } from '../core/View'
import { Text } from '../core/Text'

export const subheaderHeight = 32

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

@styles({
  root: {
    position: 'absolute',
    top: headerHeight,
    left: '0',
    width: '100%',
    height: subheaderHeight,
    backgroundColor: primarySoftLight,
    padding: spacing.medium,
    filter: `drop-shadow(0 0 5.75rem ${primarySoftLight})`,
    boxSizing: 'border-box',

    '& > *': {
      width: containerWidth.desktop,
      margin: '0 auto',
    }
  },
  label: { extend: typography.semiBoldMedium, color: light },
  labelAttention: { extend: typography.semiBoldSmall, color: 'rgba(255, 249, 0, 0.86)' },
  text: { extend: typography.regularSmall, color: light },
})
export class PublicSubheader extends Component {
  // to-do: Refactor whole module due to standartization

  render() {
    const { classes } = this.props

    return (
      <View className={classes.root} style={{ alignItems: 'center' }}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }} className={classes.labelAttention}>
            <EmojiFlagsIcon size="medium" />
            Офіційний представник в Україні
          </View>
          <View style={{ alignItems: 'center' }} className={classes.label}>
            <HipchatDialOutIcon />
            <Offset />
            <Text>(050) 482-20-98</Text>
            <Offset />/<Offset />
            <Text>(067) 761-99-43</Text>
            <Offset />/<Offset />
            <Text>(073) 454-86-72</Text>
          </View>
        </View>
      </View>
    )
  }
}
