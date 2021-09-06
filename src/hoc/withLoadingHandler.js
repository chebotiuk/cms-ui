import React, { PureComponent, Component, Fragment } from 'react'
import Spinner from '@atlaskit/spinner'

import { styles } from './styles'
import { View } from '../components/core/View'

@styles({
  root: {
    width: '100%',
    height: '100%',
  }
})
class Loader extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}
                className={classes.root}>
        <Spinner size="medium" />
      </View>
    )
  }
}

export const withLoadingHandler = WrappedComponent => class extends Component {
  state = {
    isLoading: false
  }

  setLoadingStatus = value => {
    this.setState({ isLoading: value })
  }

  render() {
    const { isLoading } = this.state

    return (
      <Fragment>
        <View style={{ display: isLoading ? 'none' : 'initial' }}>
          <WrappedComponent {...this.props}
                            setLoadingStatus={this.setLoadingStatus} />
        </View>
        {isLoading && <Loader />}
      </Fragment>
    )
  }
}
