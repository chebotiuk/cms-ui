import React, { Component } from 'react'

import { styles } from '../../../hoc/styles'
import { spacing } from '../../../styles/layout'
import { typography } from '../../../styles/typography'
import { primary } from '../../../styles/colors'
import { consumeContext } from '../../../hoc/context'
import { View } from '../../core/View'
import { Text } from '../../core/Text'
import { Offset } from '../../shared/Offset'
import { api } from '../../../api'
import { Button } from '../../shared/Button'
import { routes } from '../../../routes'

const LabeledValue = styles({
  root: {
    margin: [spacing.medium, 0],
  },
  labelText: {
    extend: typography.regularMedium,
    color: primary,
    textTransform: 'capitalize',
  }
})(({ label, value, classes }) => (
  <View className={classes.root}>
    <Text className={classes.labelText}>{label}:</Text>
    <Offset spacing="small" />
    <Text className="text">{value}</Text>
  </View>
))

@consumeContext('authUserContext')
export class Account extends Component {
  onLogout = () => {
    api.post('/logout')
      .then(() => {
        this.props.history.push(routes.public.auth)
      })
      .catch(console.error)
  }

  render() {
    const { authUserContext: { authUser } } = this.props

    return (
      <View style={{ flexDirection: 'column' }}>
        <LabeledValue label="name"
                      value={authUser.username} />
        <LabeledValue label="type"
                      value={authUser.type} />
        <Button onClick={this.onLogout}
                appearance="danger"
                spacing="compact">
          Logout
        </Button>
      </View>
    )
  }
}
