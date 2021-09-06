import { createUseStyles } from 'react-jss'
import React, { Fragment, useState } from 'react'
import Toggle from '@atlaskit/toggle'

import { BlockRenderer } from '../../../shared/BlockRenderer'
import { Text } from '../../../core/Text'
import { View } from '../../../core/View'
import { secondaryLight } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'

const useNavbarItemStyles = createUseStyles({
  labelText: {
    extend: typography.regularSmall,
    color: secondaryLight
  },
})

export function Preview({ source }) {
  const [visible, setVisible] = useState(false)
  const classes = useNavbarItemStyles()

  return (
    <Fragment>
      <View style={{ alignItems: 'center' }}>
        <Text className={classes.labelText}>Toggle preview</Text>
        <Toggle onChange={() => setVisible(!visible)} isChecked={visible} />
      </View>
      {visible && <BlockRenderer source={source} />}
    </Fragment>
  )
}
