import { withProps, withStateHandlers } from 'recompose'
import { range } from 'lodash'
import { Link, withRouter } from 'react-router-dom'
import React, { PureComponent } from 'react'
import TableTree from '@atlaskit/table-tree'
import Pagination from '@atlaskit/pagination'

import { ScrollableView } from '../../core/ScrollableFlexView'
import { styles } from '../../../hoc/styles'
import { passParams } from '../../../lib/helpers'
import { fetchData } from '../../../hoc/fetchData'
import { spacing } from '../../../styles/layout'
import { Text } from '../../core/Text'
import { View } from '../../core/View'
import { Button } from '../../shared/Button'
import { Offset } from '../../shared/Offset'
import { api } from '../../../api'
import { routes } from '../../../routes'
import { globalState } from '../../../hoc/globalState'
import { AddNewButton } from '../../shared/AddNewButton'

const Article = props => <Text className="text">{props.article}</Text>
const Title = props => <Text className="text">{props.title}</Text>
const Actions = ({ onEdit, onDuplicate, onDelete, id }) => (
  <View>
    <Button onClick={() => { onEdit(id) }}
            appearance="primary"
            spacing="compact">
      Edit
    </Button>
    <Offset spacing="small" />
    <Button onClick={() => { onDuplicate(id) }}
            appearance="primary"
            spacing="compact">
      Duplicate
    </Button>
    <Offset spacing="small" />
    <Button onClick={() => { onDelete(id) }}
            appearance="danger"
            spacing="compact">
      Delete
    </Button>
  </View>
)

@globalState
@withStateHandlers({
  page: 1,
}, {
  setPage: () => (page) => ({ page }),
})
@fetchData({
  products: ({ page }) => api.get('/products/page', {
    queryParams: {
       skip: 50 * (page - 1),
       limit: 50
    }
  })
})
@withProps(({ data: { products } }) => ({
  tableItems: products.records.map(({ _id: id, article, name, price, marginRatio, wholesalePrice }) => ({
    id,
    content: {
      id,
      article: article,
      title: name,
      wholesalePrice,
      marginRatio,
      price,
      actions: true,
    }
  }))
}))
@withRouter
@styles({
  footer: {
    marginTop: spacing.medium,
  },
})
export class Products extends PureComponent {
  componentDidUpdate (prevProps) {
    if (prevProps.page !== this.props.page) this.props.data.refetch()
  }

  handlePaginationChange = (event, newPage) => {
    this.props.setPage(newPage)
  }

  onProductEdit = id => {
    this.props.history.push(passParams(routes.admin.products.update, { id }))
  }

  onProductDuplicate = id => {
    this.props.history.push(routes.admin.products.create, { id })
  }

  onProductDelete = id => {
    const { data, dispatch } = this.props

    api.delete('/products/:id', { params: { id } })
      .then(data.refetch)
      .catch(error => { dispatch({ type: 'HTTP_ERROR', payload: error }) })
  }

  render() {
    const { data: { products: { pageInfo } }, tableItems, classes } = this.props
    const pages = range(1, pageInfo.pages + 1)

    return (
      <View style={{ flexDirection: 'column', flex: '1 0 auto' }}>
        <ScrollableView vertical>
          <TableTree
            headers={['Article', 'Title', 'Actions']}
            columns={[
              Article,
              Title,
              props => (
                <Actions {...props}
                         onEdit={this.onProductEdit}
                         onDuplicate={this.onProductDuplicate}
                         onDelete={this.onProductDelete} />
              )
            ]}
            columnWidths={['10%', '70%']}
            items={tableItems}
          />
        </ScrollableView>
        <View className={classes.footer}
                  style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 'none' }}>
          <Link to={routes.admin.products.create}>
            <AddNewButton />
          </Link>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Pagination pages={pages} onChange={this.handlePaginationChange} />
        </View>
      </View>
    )
  }
}
