import React from 'react'
import { createUseStyles } from 'react-jss'

import { typography } from '../../styles/typography'
import { primary } from '../../styles/colors'
import { useLocalization } from '../../localization/localizationLoader'
import { View } from '../core/View'
import { Text } from '../core/Text'
import { Offset } from '../shared/Offset'
import { Markdown } from '../shared/Markdown'

const useNavbarItemStyles = createUseStyles({
  container: {
    '& > *': {
      width: '50%'
    }
  },
  title: { extend: typography.semiBoldExtraHuge, color: primary },
})


export function InfoPage({ match: { params: { page } } }) {
  const classes = useNavbarItemStyles()
  const [ localization ] = useLocalization(page)

  if (!localization) return null

  return (
    <View className={classes.container} style={{ justifyContent: 'center' }}>
      <View style={{ flexDirection: 'column' }}>
        <Offset spacing="huge" vertical />
        <Text className={classes.title}>{localization.title}</Text>
        <Offset spacing="medium" vertical />
        <Markdown source={localization.text} />
      </View>
    </View>
  )
}
