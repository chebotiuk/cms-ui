import React, { Component } from 'react'

import { fetchData } from '../../hoc/fetchData'
import { rootContextProviders } from '../../context/rootContextProviders'
import { consumeContext } from '../../hoc/context'
import { api } from '../../api'
import { Admin } from './Admin'

@fetchData({
  user: () => api.get('/authorized_user')
})
@rootContextProviders
@consumeContext('socketContext')
export default class Root extends Component {
  componentDidMount() {
    this.props.socketContext.getInstance().emit('requestUserState', {})
  }

  componentWillUnmount() {
    this.props.socketContext.killInstance()
  }

  render () {
    return <Admin />
  }
}
