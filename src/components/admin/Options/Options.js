import React, { Component, Fragment } from 'react'

import { ScrollableView } from '../../core/ScrollableFlexView'
import { styles } from '../../../hoc/styles'
import { fetchData } from '../../../hoc/fetchData'
import { api } from '../../../api'
import { View } from '../../core/View'
import { Offset } from '../../shared/Offset'
import { Separator } from '../../shared/Separator'

@fetchData({
  options: () => api.get('/options')
})
@styles({
  barSection: {
    width: 350,
  },
})
export class Options extends Component {
  onAddNewItemSubmit = value => {
    const { data } = this.props

    return api.post('/options', { name: value })
      .then(data.refetch)
  }

  render() {
    const { data: { options } } = this.props

    return (
      <View style={{ flexGrow: 1, flexDirection: 'column' }}>
        <ScrollableView vertical>
          {options.map(({ _id, name }) => (
            <Fragment key={_id}>
              <Offset vertical />
              <Separator />
              <Offset vertical />
            </Fragment>
          ))}
        </ScrollableView>
      </View>
    )
  }
}
