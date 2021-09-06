import React, { Component } from 'react'

import { api } from '../../../api'
import { SubmittableInput } from '../../shared/Form/SubmittableInput'
import { View } from '../../core/View'
import { Text } from '../../core/Text'
import { Offset } from '../../shared/Offset'
import { Button } from '../../shared/Button'

export class CategoryItem extends Component {
  state = {
    isEditing: false,
  }

  edit = () => {
    this.setState({
      isEditing: true
    })
  }

  delete = () => {
    const { id, onDelete } = this.props

    api.delete('/categories/:id', { params: { id } })
      .then(onDelete)
  }

  submit = value => {
    const { id, onEdit } = this.props

    return api.put('/categories/:id', { name: value }, { params: { id } })
      .then(onEdit)
  }

  cancelEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const { name } = this.props
    const { isEditing } = this.state

    return isEditing 
      ? (
        <SubmittableInput value={name}
                          onSubmit={this.submit}
                          onCancel={this.cancelEdit} />
      )
      : (
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
          <Text className="text">{name}</Text>
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
