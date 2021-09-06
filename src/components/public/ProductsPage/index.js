import { withStateHandlers } from 'recompose'
import { range } from 'lodash'
import React, { PureComponent, Fragment } from 'react'
import Pagination from '@atlaskit/pagination'

import { consumeContext } from '../../../hoc/context'
import { ScrollableView } from '../../core/ScrollableFlexView'
import { passParams } from '../../../lib/helpers'
import { routes } from '../../../routes'
import { Product } from './Product'
import { fetchData } from '../../../hoc/fetchData'
import { View } from '../../core/View'
import { api } from '../../../api'
import { Offset } from '../../shared/Offset';
import { SideMenu } from '../SideMenu'

const PRODUCTS_PER_PAGE = 10

const parseFilter = WrappedComponent =>
  @consumeContext('searchParamsContext')
  @fetchData({
    categories: () => api.get('/categories')
  })
  class extends PureComponent {
    get filter() {
      const { data: { categories }, searchParamsContext: { searchParams } } = this.props

      const filter = searchParams.get('filter') ? JSON.parse(searchParams.get('filter')) : {}

      const categoryIds = filter.category
        ? categories.find(
          ({ name }) => name === filter.category
        )._id
        : null

      return {
        ...(categoryIds ? { categoryIds } : {})
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} filter={JSON.stringify(this.filter)} />
      )
    }
  }

@withStateHandlers({
  page: 1,
}, {
  setPage: () => (page) => ({ page }),
})
@parseFilter
@fetchData({
  products: ({ page, filter }) => api.get('/products/page', {
    queryParams: {
      skip: PRODUCTS_PER_PAGE * (page - 1),
      limit: PRODUCTS_PER_PAGE,
      filter,
    }
  })
})
export default class ProductsPage extends PureComponent {
  timeout = null

  componentDidUpdate (prevProps) {
    // optimization for pagination
    if (prevProps.page !== this.props.page) {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.props.data.refetch()
      }, 300)

      return
    }

    if (prevProps.filter !== this.props.filter) this.props.data.refetch()
  }

  handlePaginationChange = (event, newPage) => {
    this.props.setPage(newPage)
  }

  render() {
    const { data: { products: { records, pageInfo } }, history } = this.props
    const pages = range(1, pageInfo.pages + 1)

    return (
      <View style={{ flexGrow: 1, minHeight: window.screen.height }}>
        <View style={{ flex: '0.2 1 0' }}>
          <SideMenu />
        </View>
        <View style={{ flex: '0.01 1 0' }} />
        <View style={{ flexDirection: 'column', flex: '0.79 1 0' }}>
          <ScrollableView vertical style={{ flexGrow: 1 }}>
            {records.map(product => (
              <Fragment key={product._id}>
                <Product {...product}
                         onClick={() => { history.push(passParams(routes.public.products.one, { id: product._id })) }} />
                <Offset vertical spacing="medium" />
              </Fragment>
            ))}
          </ScrollableView>
          <View style={{ justifyContent: 'center' }}>
            <Pagination pages={pages} onChange={this.handlePaginationChange} />
          </View>
        </View>
      </View>
    )
  }
}

