import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { SubmittableInput } from '../../shared/Form/SubmittableInput'
import { View } from '../../core/View'
import { Text } from '../../core/Text'
import { Offset } from '../../shared/Offset'
import { Button } from '../../shared/Button'

export class EditableText extends Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired, 
  }

  state = {
    isEditing: false,
  }

  edit = () => {
    this.setState({
      isEditing: true
    })
  }

  delete = () => {
    const { onDelete } = this.props
    onDelete()
  }

  submit = value => {
    const { onSubmit } = this.props
    onSubmit()
  }

  cancelEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const { value } = this.props
    const { isEditing } = this.state

    return isEditing 
      ? (
        <SubmittableInput value={value}
                          onSubmit={this.submit}
                          onCancel={this.cancelEdit} />
      )
      : (
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
          <Text className="text">{value}</Text>
          <Offset spacing="small" />
          <View>
            <Button appearance="primary"
                    onClick={this.edit}>
              Edit
            </Button>
            <Offset spacing="small" />
            <Button appearance="danger"
                    onClick={this.delete}>
              Delete
            </Button>
          </View>
        </View>
      )
  }
}
