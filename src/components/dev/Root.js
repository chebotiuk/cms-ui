import React, { useMemo, Fragment } from 'react'
import { createUseStyles } from 'react-jss'

import { View } from '../core/View'
import { Text } from '../core/Text'
import { Offset } from '../shared/Offset'

import * as colors from '../../styles/colors'
import { typography } from '../../styles/typography'

function Color({ colorKey, value }) {
  return (
    <View>
      <Text className="text" style={{ minWidth: '150px' }}>{colorKey}</Text>
      <View style={{ width: 36, height: 18, borderRadius: 4, backgroundColor: value }} />
    </View>
  )
}

function Typography({ typKey, value }) {
  const useNavbarItemStyles = useMemo(() => createUseStyles({
    text: { extend: value },
  }), [])

  const classes = useNavbarItemStyles()

  return <Text className={classes.text}>{typKey}</Text>
}

export function Root() {
  const colorMap = useMemo(() => {
    const arr = []

    for (let colorKey in colors) {
      arr.push({ colorKey, value: colors[colorKey] })
    }

    return arr
  }, [])

  const typographyMap = useMemo(() => {
    const arr = []

    for (let typKey in typography) {
      arr.push({ typKey, value: typography[typKey] })
    }

    return arr
  }, [])

  return (
    <View>
      <View style={{ flexDirection: 'column' }}>
        <Offset spacing="huge" vertical />
        <Text>Colors:</Text>
        <Offset spacing="huge" vertical />
        {colorMap.map(props => (
          <Fragment key={props.colorKey}>
            <Color {...props} />
            <Offset spacing="medium" vertical />
          </Fragment>
        ))}
      </View>
      <Offset spacing="huge" />
      <View style={{ flexDirection: 'column' }}>
        <Offset spacing="huge" vertical />
        <Text>Typography:</Text>
        <Offset spacing="huge" vertical />
        {typographyMap.map((props) => (
          <Fragment key={props.typKey}>
            <Typography {...props} />
            <Offset spacing="medium" vertical />
          </Fragment>
        ))}
      </View>
    </View>
  )
}
