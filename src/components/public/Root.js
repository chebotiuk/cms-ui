import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { provideContext } from '../../hoc/context'
import { useSearchParams } from '../../hook/useSearchParams'
import AuthPage from './AuthPage'
import { Public } from './Public'
import { routes } from '../../routes'

@provideContext(
  'searchParamsContext',
  ({ searchParams, setSearchParams }) => ({ searchParams, setSearchParams }),
)
class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={routes.public.auth} component={AuthPage} />
        <Route component={Public} />
      </Switch>
    )
  }
}

export function Root() {
  const [searchParams, setSearchParams] = useSearchParams()

  return <Routing searchParams={searchParams} setSearchParams={setSearchParams} />
}
