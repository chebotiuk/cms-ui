import { branch, compose, flattenProp, withProps } from 'recompose'
import React, { PureComponent } from 'react'
import FieldText from '@atlaskit/field-text'
import { withRouter } from 'react-router-dom'
import TextArea from '@atlaskit/textarea'
import { get } from 'lodash'

import { Offset } from '../../shared/Offset'
import { withLoadingHandler } from '../../../hoc/withLoadingHandler'
import { fetchData } from '../../../hoc/fetchData'
import { globalState } from '../../../hoc/globalState'
import { api } from '../../../api'
import { routes } from '../../../routes'
import { View } from '../../core/View'
import { Button } from '../../shared/Button'
import { Preview } from './Preview'
import { typography } from '../../../styles/typography'
import { secondaryLight } from '../../../styles/colors'
import { styles } from '../../../hoc/styles'

@globalState
@withRouter
@withLoadingHandler
@withProps(({ updateById, duplicateById }) => ({
  isNew: !updateById,
  id: updateById || duplicateById
}))
@branch(
  ({ id }) => id,
  fetchData({
    block: ({ id }) => api.get('/blocks/:id', { params: { id } })
  })
)
@styles({
  labelText: {
    extend: typography.regularSmall,
    color: secondaryLight,
    fontWeight: 600,
    padding: '20px 0px 4px 0px',
    lineHeight: 1.3333333333333333
  },
})
export class BlockUpdateForm extends PureComponent {
  state = {
    key: get(this.props, 'data.block.key', ''),
    textBlock: get(this.props, 'data.block.textBlock', '')
  }

  get block() {
    return this.state
  }

  handleInputEventOnField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    })
  }

  redirectOnBlocksPage = () => {
    this.props.history.push(routes.admin.blocks.root)
  }

  postNewBlock = () => {
    const { setLoadingStatus, dispatch } = this.props

    api.post('/blocks', this.block)
      .then(this.redirectOnBlocksPage)
      .catch(err => {
        setLoadingStatus(false)
        dispatch({ type: 'HTTP_ERROR', payload: err })
      })
  }

  updateExistingBlock = () => {
    const { id, setLoadingStatus, dispatch } = this.props

    api.put('/blocks/:id', this.block, { params: { id } })
      .then(this.redirectOnBlocksPage)
      .catch(err => {
        setLoadingStatus(false)
        dispatch({ type: 'HTTP_ERROR', payload: err })
      })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.setLoadingStatus(true)

    if (this.props.isNew) return this.postNewBlock()

    this.updateExistingBlock()
  }

  render() {
    const {
      key,
      textBlock
    } = this.state

    const { classes } = this.props

    return (
      <form onSubmit={this.onSubmit}>
        <FieldText
          required
          shouldFitContainer
          label="Key name"
          onChange={this.handleInputEventOnField('key')}
          value={key}
          autoFocus
        />
        <Offset vertical />
        <View className={classes.labelText}>Markdown textBlock</View>
        <TextArea
          isSpellCheckEnabled
          shouldFitContainer
          onChange={this.handleInputEventOnField('textBlock')}
          value={textBlock}
        />
        <Offset vertical />
        <Preview source={textBlock} />
        <Offset vertical />
        <View style={{ justifyContent: 'flex-end' }}>
          <Button appearance="primary"
                  type="submit">
            Submit
          </Button>
        </View>
      </form>
    )
  }
}
