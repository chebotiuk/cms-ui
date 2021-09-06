import React, { Component } from 'react'

import { SubmittableInput } from './Form/SubmittableInput'
import { AddNewButton } from './AddNewButton'

export class NewItemStateless extends Component {
  state = {
    isNewItemFormVisible: false,
  }

  openNewItemForm = () => {
    this.setState({ isNewItemFormVisible: true })
  }

  closeNewItemForm = () => {
    this.setState({ isNewItemFormVisible: false })
  }

  render() {
    const { onSubmit } = this.props
    const { isNewItemFormVisible } = this.state

    return isNewItemFormVisible
      ? (
        <SubmittableInput onCancel={this.closeNewItemForm}
                                   onSubmit={onSubmit} />
      )
      : (
        <AddNewButton onClick={this.openNewItemForm} />
      )
  }
}
