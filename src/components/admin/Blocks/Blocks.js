import { withProps } from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import React, { PureComponent } from 'react'
import TableTree from '@atlaskit/table-tree'

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

const Key = props => <Text className="text">{props.keyName}</Text>
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
@fetchData({
  blocks: () => api.get('/blocks')
})
@withProps(({ data: { blocks } }) => ({
  tableItems: blocks.map(({ _id: id, key }) => ({
    id,
    content: {
      id,
      keyName: key,
    }
  }))
}))
@withRouter
@styles({
  footer: {
    marginTop: spacing.medium,
  },
})
export class Blocks extends PureComponent {
  onBlockEdit = id => {
    this.props.history.push(passParams(routes.admin.blocks.update, { id }))
  }

  onBlockDuplicate = id => {
    this.props.history.push(routes.admin.blocks.create, { id })
  }

  onBlockDelete = id => {
    const { data, dispatch } = this.props

    api.delete('/blocks/:id', { params: { id } })
      .then(data.refetch)
      .catch(error => { dispatch({ type: 'HTTP_ERROR', payload: error }) })
  }

  render() {
    const { tableItems, classes } = this.props

    return (
      <View style={{ flexDirection: 'column', flex: '1 0 auto' }}>
        <ScrollableView vertical>
          <TableTree
            headers={['Key', 'Actions']}
            columns={[
              Key,
              props => (
                <Actions {...props}
                         onEdit={this.onBlockEdit}
                         onDuplicate={this.onBlockDuplicate}
                         onDelete={this.onBlockDelete} />
              )
            ]}
            columnWidths={['80%']}
            items={tableItems}
          />
        </ScrollableView>
        <View className={classes.footer}
                  style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 'none' }}>
          <Link to={routes.admin.blocks.create}>
            <AddNewButton />
          </Link>
        </View>
      </View>
    )
  }
}
