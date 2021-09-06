import React, { Component, Fragment } from 'react'

import { ScrollableView } from '../../core/ScrollableFlexView'
import { fetchData } from '../../../hoc/fetchData'
import { api } from '../../../api'
import { View } from '../../core/View'
import { NewItemStateless } from '../../shared/NewItemStateless'
import { TemplateItem } from './TemplateItem'
import { Offset } from '../../shared/Offset'
import { Separator } from '../../shared/Separator'

@fetchData({
  templates: () => api.get('/templates')
})
export class Templates extends Component {
  onAddNewItemSubmit = value => {
    const { data } = this.props

    return api.post('/templates', { name: value, items: [] })
      .then(data.refetch)
  }

  render() {
    const { data: { templates }, data } = this.props

    return (
      <View style={{ flexGrow: 1, flexDirection: 'column' }}>
        <ScrollableView vertical>
          {templates.map(({ _id, name, items }) => (
            <Fragment key={_id}>
              <TemplateItem id={_id}
                            name={name}
                            items={items}
                            onEdit={data.refetch}
                            onDelete={data.refetch} />
              <Offset vertical />
              <Separator />
              <Offset vertical />
            </Fragment>
          ))}
        </ScrollableView>
        <View>
          <NewItemStateless onSubmit={this.onAddNewItemSubmit} />
        </View>
      </View>
    )
  }
}
