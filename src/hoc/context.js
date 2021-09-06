import { memoize } from 'lodash'
import React from 'react'

const getContext = memoize(React.createContext)

export const provideContext = (name, getValueFromProps) => {
  const { Provider } = getContext(name)

  return WrappedComponent => props => (
    <Provider value={getValueFromProps(props)}>
      <WrappedComponent {...props} />
    </Provider>
  )
}

export const consumeContext = name => WrappedComponent => props => {
  const { Consumer } = getContext(name)

  return (
    <Consumer>
      {context => (
        <WrappedComponent {...props}
                          {...{ [name]: context }} />
      )}
    </Consumer>
  )
}
