import React, { Component } from 'react'
import { FieldTextStateless } from '@atlaskit/field-text'

import { withRouter } from 'react-router'

import { styles } from '../../../hoc/styles'
import { spacing, radius } from '../../../styles/layout'
import { muted } from '../../../styles/colors'
import { api } from '../../../api'
import { View } from '../../core/View'
import { Button } from '../../shared/Button'
import { routes } from '../../../routes'

@styles({
  root: {
    height: '500px'
  },
  button: {
    marginTop: spacing.medium,
  },
  container: {
    padding: [0, spacing.medium, spacing.medium, spacing.medium],
    borderRadius: radius.solid,
    border: `1px solid ${muted}`,
  }
})
@withRouter
export default class AuthPage extends Component {
  state = {
    username: '',
    password: '',
  };

  setLogin = e =>
    this.setState({ username: e.target.value })

  setPassword = e =>
    this.setState({ password: e.target.value })

  onSubmit = () => {
    api.post('/login', this.state)
      .then(() => {
        this.props.history.push(routes.admin.root)
      })
      .catch(console.error)
  }

  render() {
    const { classes } = this.props
    const { username, password } = this.state

    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                className={classes.root}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}
                  className={classes.container}>
          <FieldTextStateless
            label="Login"
            onChange={this.setLogin}
            value={username}
            autoFocus
          />
          <FieldTextStateless
            label="Password"
            onChange={this.setPassword}
            value={password}
          />
          <Button className={classes.button}
                  appearance="primary"
                  onClick={this.onSubmit}>
            Sign up
          </Button>
        </View>
      </View>
    )
  }
}
