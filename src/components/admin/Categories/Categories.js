import React, { Component, Fragment } from 'react'

import { ScrollableView } from '../../core/ScrollableFlexView'
import { styles } from '../../../hoc/styles'
import { fetchData } from '../../../hoc/fetchData'
import { api } from '../../../api'
import { View } from '../../core/View'
import { NewItemStateless } from '../../shared/NewItemStateless'
import { CategoryItem } from './CategoryItem'
import { Offset } from '../../shared/Offset'
import { Separator } from '../../shared/Separator'

@fetchData({
  categories: () => api.get('/categories')
})
@styles({
  barSection: {
    width: 350,
  },
})
export class Categories extends Component {
  onAddNewItemSubmit = value => {
    const { data } = this.props

    return api.post('/categories', { name: value })
      .then(data.refetch)
  }

  render() {
    const { data: { categories }, data, classes } = this.props

    return (
      <View style={{ flexGrow: 1, flexDirection: 'column' }}>
        <ScrollableView vertical
                            className={classes.barSection}>
          {categories.map(({ _id, name }) => (
            <Fragment key={_id}>
              <CategoryItem id={_id}
                            name={name}
                            onEdit={data.refetch}
                            onDelete={data.refetch} />
              <Offset vertical />
              <Separator />
              <Offset vertical />
            </Fragment>
          ))}
        </ScrollableView>
        <View className={classes.barSection}>
          <NewItemStateless onSubmit={this.onAddNewItemSubmit} />
        </View>
      </View>
    )
  }
}
