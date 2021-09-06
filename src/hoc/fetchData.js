import { compose } from 'recompose'
import React, { Component, useEffect } from 'react'

import { useGlobalState } from '../hook/useGlobalState'

export const execute = (operationsMap) => WrappedComponent => class ExecutiveComponentDebug extends Component {
  state = {
    data: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    this.execute()
  }

  execute = () => {
    this.setState({ loading: true })
    const promises = []
    const fetchedData = {}

    for (let key in operationsMap) {
      promises.push(
        operationsMap[key](this.props).then(data => { fetchedData[key] = data })
      )
    }

    return Promise.all(promises)
      .then(data => { this.setState({ data: fetchedData, loading: false }) })
      .catch(error => { this.setState({ error, loading: false }) })
  }

  render() {
    const { data, loading, error } = this.state

    return (
      <WrappedComponent {...this.props}
                        data={data}
                        reexecute={this.execute}
                        loading={loading}
                        error={error} />
    )
  }
}

const queryHandler = WrappedComponent => function QueryHandlerComponentDebug(props) {
  const [_, dispatch] = useGlobalState()
 
  const { data, error, reexecute } = props

  useEffect(() => {
    if (error) dispatch({ type: 'HTTP_ERROR', payload: error })
  }, [error])


  if (error) {
    return null
  }

  return data ? (
    <WrappedComponent {...props}
                      data={data && Object.assign(data, { refetch: reexecute })} />
  ) : null
}

export const fetchData = queries => compose(
  execute(queries),
  queryHandler
)
