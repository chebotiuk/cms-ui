import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import { Notification } from './components/shared/Notification'
import { View } from './components/core/View'
import { routes } from './routes'
import { Root as PublicRoot } from './components/public/Root'
import { Root as DevRoot } from './components/dev/Root'
import { ipadLandscape, iphone6Portrait } from './styles/responsive'
import { containerWidth } from './styles/layout'
import { styles } from './hoc/styles'
import { StateProvider } from './hook/useGlobalState'
import { api } from './api'
import { initialState, reducer } from './globalState'

class AdminLoader extends Component {
  state = {
    AdminRoot: null
  }

  componentDidMount() {
     import('./components/admin/Root')
       .then(({ default: AdminRoot }) => { this.setState({ AdminRoot }) })
  }

  render() {
    const { AdminRoot } = this.state

    return AdminRoot ? <AdminRoot /> : null
  }
}

@styles({
  rootContainer: {
    width: containerWidth.desktop,
    height: 'inherit',
    margin: '0 auto',

    [ipadLandscape]: {
      width: containerWidth.tablet,
    },
    [iphone6Portrait]: {
      width: containerWidth.mobile,
    },
  },
})
class App extends Component {
  componentDidCatch(error, info) {
    api.post('/logs', { type: "info", message: `CLIENT_UNCAUGHT_EXCEPTION: ${error.name} ${error.message}` })
  }

  render() {
    const { classes } = this.props

    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <View className={classes.rootContainer}
              style={{ flexDirection: 'column' }}>
          <Notification />
          <Switch>
            <Route exact path={routes.dev} component={DevRoot} />
            <Route path={routes.admin.root} component={AdminLoader} />
            <Route component={PublicRoot} />
          </Switch>
        </View>
      </StateProvider>
    )
  }
}

export default App;
