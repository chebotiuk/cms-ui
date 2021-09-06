import React from 'react'
import PropTypes from 'prop-types'

import { View } from './View'

export const ListView = ({ dataSource, renderRow }) => (
  <View style={{ flexDirection: 'column' }}>
    {dataSource.map(renderRow)}
  </View>
)

ListView.propTypes = {
  dataSource: PropTypes.array.isRequired,
  renderRow: PropTypes.func
}
