import React, { PureComponent } from 'react'
import MultiSelect from '@atlaskit/multi-select'

import { fetchData } from '../../../../hoc/fetchData'
import { api } from '../../../../api'

@fetchData({
  categories: () => api.get('/categories')
})
export class CategoryMultiSelect extends PureComponent {
  mapper = ({ name, _id }) => ({ content: name, value: _id })

  get defaultSelected() {
    const { value } = this.props
    return value.map(this.mapper)
  }

  get categories() {
    const { data: { categories } } = this.props

    return [{ items: categories.map(this.mapper) }]
  }

  onChange = ({ items }) => {
    const { onChange } = this.props

    onChange(
      items.map(({ content, value }) => ({ name: content, _id: value }))
    )
  }

  render() {
    return (
      <MultiSelect
        defaultSelected={this.defaultSelected}
        items={this.categories}
        placeholder="Choose a category"
        label="Categories"
        onSelectedChange={this.onChange}
      />
    )
  }
}
