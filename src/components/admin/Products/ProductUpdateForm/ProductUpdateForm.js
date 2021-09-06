import { branch, compose, flattenProp, withProps } from 'recompose'
import { omit } from 'lodash'
import { withRouter } from 'react-router-dom'
import FieldText from '@atlaskit/field-text'
import React, { PureComponent } from 'react'
import TextArea from '@atlaskit/textarea'

import { Button } from '../../../shared/Button'
import { CategoryMultiSelect } from './CategoryMultiSelect'
import { FileUpload } from '../../../shared/Form/FileUpload'
import { Offset } from '../../../shared/Offset'
import { Preview } from './Preview'
import { PriceList } from './PriceList'
import { Text } from '../../../core/Text'
import { View } from '../../../core/View'
import { api } from '../../../../api'
import { fetchData } from '../../../../hoc/fetchData'
import { globalState } from '../../../../hoc/globalState'
import { routes } from '../../../../routes'
import { secondaryLight } from '../../../../styles/colors'
import { styles } from '../../../../hoc/styles'
import { typography } from '../../../../styles/typography'
import { withLoadingHandler } from '../../../../hoc/withLoadingHandler'
import TemplatePicker from './TemplatePicker'

@globalState
@withRouter
@withLoadingHandler
@withProps(({ updateById, duplicateById }) => ({
  isNew: !updateById,
  id: updateById || duplicateById
}))
@branch(
  ({ id }) => id,
  compose(
    fetchData({
      product: ({ id }) => api.get('/products/:id', { params: { id } })
    }),
    flattenProp('data'),
    flattenProp('product')
  )
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
export class ProductUpdateForm extends PureComponent {
  state = {
    article: this.props.isNew ? '' : (this.props.article || ''),
    name: this.props.name || '',
    shortDescription: this.props.shortDescription || '',
    description: this.props.description || '',
    prices: this.props.prices || [],
    files: this.props.isNew ? [] : this.props.files,
    categories: this.props.categories || [],
    options: this.props.options || [],
    additionalOptions: this.props.additionalOptions || []
  }

  get product() {
    const { files, categories, options, prices, additionalOptions } = this.state

    const productBody = omit(this.state, ['files', 'categories', 'options', 'prices', 'additionalOptions'])

    if (productBody.article === '') productBody.article = undefined

    productBody.fileIds = files.map(({ _id }) => _id)
    productBody.categoryIds = categories.map(({ _id }) => _id)
    productBody.optionIds = options.map(({ _id }) => _id)
    productBody.prices = prices.map(price => omit(price, 'accountedPrice'))
    productBody.additionalOptions = additionalOptions.map(option => omit(option, 'accountedPrice'))

    return productBody
  }

  get categoryList() {
    const { categories } = this.props

    return [{
      items: categories.map(({ name, _id }) => ({ content: name, id: _id }))
    }]
  }

  handleInputEventOnField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    })
  }

  setFieldValue = fieldName => value => {
    this.setState({
      [fieldName]: value
    })
  }

  onUploadListChange = uploadList => {
    this.setState({
      files: uploadList
    })
  }

  onCategoryListChange = categoryList => {
    this.setState({
      categories: categoryList
    })
  }

  onPriceChange = categoryList => {
    this.setState({
      categories: categoryList
    })
  }

  onTemplateApply = keySet => {
    this.setFieldValue('prices')(
      keySet.map(key => ({ 
        key,
        wholesalePrice: 0,
        marginRatio: '1',
        price: 0,
      }))
    )
  }

  redirectOnProductsPage = () => {
    this.props.history.push(routes.admin.products.root)
  }

  postNewProduct = () => {
    const { setLoadingStatus, dispatch } = this.props

    api.post('/products', this.product)
      .then(this.redirectOnProductsPage)
      .catch(err => {
        setLoadingStatus(false)
        dispatch({ type: 'HTTP_ERROR', payload: err })
      })
  }

  updateExistingProduct = () => {
    const { id, setLoadingStatus, dispatch } = this.props

    api.put('/products/:id', this.product, { params: { id } })
      .then(this.redirectOnProductsPage)
      .catch(err => {
        setLoadingStatus(false)
        dispatch({ type: 'HTTP_ERROR', payload: err })
      })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.setLoadingStatus(true)

    if (this.props.isNew) return this.postNewProduct()

    this.updateExistingProduct()
  }

  render() {
    const {
      article,
      name,
      shortDescription,
      description,
      prices,
      files,
      categories,
      additionalOptions
    } = this.state

    const { classes } = this.props

    return (
      <form onSubmit={this.onSubmit}>
        <View>
          <FieldText
            type="number"
            label="Article"
            onChange={this.handleInputEventOnField('article')}
            value={article}
            autoFocus
          />
          <Offset />
          <FieldText
            required
            shouldFitContainer
            label="Name"
            onChange={this.handleInputEventOnField('name')}
            value={name}
          />
        </View>
        <Offset vertical />
        <CategoryMultiSelect value={categories}
                             onChange={this.onCategoryListChange} />
        <Offset vertical />
        <View className={classes.labelText}>Short description</View>
        <TextArea
          isSpellCheckEnabled
          shouldFitContainer
          onChange={this.handleInputEventOnField('shortDescription')}
          value={shortDescription}
        />
        <Offset vertical />
        <View className={classes.labelText}>Markdown description</View>
        <TextArea
          isSpellCheckEnabled
          shouldFitContainer
          onChange={this.handleInputEventOnField('description')}
          value={description}
        />
        <Offset vertical />
        <Preview source={description} />
        <Offset vertical spacing="huge" />
        <Text>Product prices:</Text>
        <Offset vertical />
        <PriceList priceList={prices}
                   onChange={this.setFieldValue('prices')} />
        <TemplatePicker onPick={this.onTemplateApply} />
        <Offset vertical spacing="huge" />
        <Text>Product options:</Text>
        <Offset vertical />
        <PriceList priceList={additionalOptions}
                   onChange={this.setFieldValue('additionalOptions')} />
        <Offset vertical />
        <FileUpload onUploadListChange={this.onUploadListChange}
                    uploads={files} />
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
