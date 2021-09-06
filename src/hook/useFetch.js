import { useState, useEffect } from 'react'

export const useFetch = (operationsMap, trackedProperties = []) => {
  const [{ data, loading, error }, setResponse] = useState({ data: null, loading: false, error: null })
  useEffect(() => { execute() }, trackedProperties)

  function execute() {
    setResponse({ data, loading: true, error})
    const promises = []
    const fetchedData = {}

    for (let key in operationsMap) {
      promises.push(
        operationsMap[key]().then(data => { fetchedData[key] = data })
      )
    }

    return Promise.all(promises)
      .then(data => { setResponse({ data: fetchedData, loading: false, error }) })
      .catch(error => { setResponse({ data: null, loading: false, error }) })
  }

  return { data, loading, error }
}
