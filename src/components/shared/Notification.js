import React, { Component } from 'react'
import Flag from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error'
import { R400 } from '@atlaskit/theme/colors'
import { branch, renderNothing } from 'recompose'

import { styles } from '../../hoc/styles'
import { muted } from '../../styles/colors'
import { globalState } from '../../hoc/globalState'

@globalState
@branch(
  ({ globalState: { notification } }) => !notification,
  renderNothing,
)
@styles({
  root: {
    position: 'fixed',
    top: '28px',
    right: '28px',
    zIndex: 1000,
    width: '300px',
    overflow: 'hidden',
    border: `2px solid ${muted}`,
    borderRadius: '6px'
  },
})
export class Notification extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  render() {
    const { classes, globalState: { notification } } = this.props
    const {
      actions = [],
      title = 'Undefined error',
      description = 'Oops, something went wrong...'
    } = notification

    return (
      <div className={classes.root}>
        <Flag
          icon={
            <ErrorIcon primaryColor={R400} label="error" />
          }
          actions={actions}
          description={description}
          id="notification"
          key="notification"
          title={title}
        />
      </div>
    )
  }
}


// actions example
//
// [
//   {
//     content: 'Try it now',
//     onClick: () => {
//       console.log('flag action clicked');
//     },
//   },
//   {
//     content: 'Learn more',
//     href: '/components/flag/examples#actions',
//   },
// ]
