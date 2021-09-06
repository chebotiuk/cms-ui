import React from 'react'

import { useGlobalState } from '../hook/useGlobalState'

export const globalState = Component => function GlobalStateHoc(props) {
  const [ globalState, dispatch ] = useGlobalState()

  return <Component {...props} globalState={globalState} dispatch={dispatch} />
}
