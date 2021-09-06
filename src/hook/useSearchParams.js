import { useState, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

// to-do: fix setSearchParams logic (now it only add one field)
export const useSearchParams = () => {
  const queryParams = useMemo(() => new URLSearchParams(window.location.search), [])

  const history = useHistory()

  const [_, setFilterConditionsRefreshed] = useState(Symbol())

  const setSearchParams = useCallback((key, value) => {
    queryParams.set(key, value)

    history.push({
      search: '?' + queryParams.toString()
    })

    setFilterConditionsRefreshed(Symbol())
  }, [queryParams])

  return [queryParams, setSearchParams]
}
