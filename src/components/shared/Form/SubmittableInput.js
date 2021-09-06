import React, { Component } from 'react'
import { FieldTextStateless } from '@atlaskit/field-text'

import { styles } from '../../../hoc/styles'
import { onClickOutside } from '../../../hoc/onClickOutside'
import { View } from '../../core/View'
import { Offset } from '../../shared/Offset'
import { Button } from '../../shared/Button'

@onClickOutside(({ onCancel }) => { onCancel() })
@styles({
  field: {
    '& > *:first-child': {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    }
  }
})
export class SubmittableInput extends Component {
  state = {
    value: this.props.value
  }

  onChange = e => this.setState({ value: e.target.value })

  submit = () => {
    const { onSubmit, onCancel } = this.props
    const { value } = this.state

    onSubmit(value)
      .then(onCancel)
  }

  onInputKeyPress = e => {
    const { onCancel } = this.props

    if (e.key === 'Enter') {
      this.submit()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  render () {
    const { onCancel, setClickOutsideTargetRef, classes } = this.props
    const { value } = this.state

    return (
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}
            className={classes.field}
            nodeRef={setClickOutsideTargetRef}>
        <FieldTextStateless
          onChange={this.onChange}
          onKeyPress={this.onInputKeyPress}
          value={value}
          autoFocus
          isLabelHidden
          compact
        />
        <Offset spacing="small" />
        <View>
          <Button appearance="primary"
                  onClick={this.submit}>
            Submit
          </Button>
          <Offset spacing="small" />
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </View>
      </View>
    )
  }
}
