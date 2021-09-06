import React, { Component } from 'react'

import { Text } from '../../core/Text'
import { styles } from '../../../hoc/styles'
import { consumeContext } from '../../../hoc/context'
import { fetchData } from '../../../hoc/fetchData'
import { typography } from '../../../styles/typography'
import { dark } from '../../../styles/colors'
import { api } from '../../../api'
import { View } from '../../core/View'
import { ListView } from '../../core/ListView'
import { CircleIndicator } from '../../shared/CircleIndicator'
import { Offset } from '../../shared/Offset'

@consumeContext('socketContext')
@fetchData({
  user: () => api.get('/authorized_user'),
  users: () => api.get('/users')
})
@styles({
  listItemText: { extend: typography.regularMedium, color: dark },
})
export class Users extends Component {
  state = {
    activeUsers: []
  }

  componentDidMount() {
    const { socketContext: { getInstance } } = this.props
    const socket = getInstance()

    socket.emit('requestUserState', {})
    socket.on('responseUserState', this.setActiveUsers)
    socket.on('connectedUsersUpdate', this.setActiveUsers)
  }

  setActiveUsers = activeUsers => {
    this.setState({ activeUsers })
  }

  render() {
    const { classes, data } = this.props
    const { activeUsers } = this.state

    return (
      <View>
        <ListView dataSource={data.users}
                  renderRow={({ username }) => (
                    <View style={{ alignItems: 'center' }}
                              key={username}>
                      <CircleIndicator on={activeUsers.indexOf(username) !== -1} />
                      <Offset horizontal />
                      <Text className={classes.listItemText}>{username}</Text>
                    </View>
                  )} />
      </View>
    )
  }
}
