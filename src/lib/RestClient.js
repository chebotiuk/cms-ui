import { passParams, toQueryString } from './url'

const SERVER_URL_BY_DEFAULT = 'http://localhost:5000'

export class RestClient {
  constructor({ serverUrl = SERVER_URL_BY_DEFAULT, apiVersion = '1' }) {
    this.baseUrl = serverUrl + '/api/v' + apiVersion
  }

  getFullUrl(path, params = {}, queryParams = {}) {
    return this.baseUrl + passParams(path, params) + toQueryString(queryParams)
  }

  get(path, { params, queryParams } = {}) {
    return fetch(
      this.getFullUrl(path, params, queryParams),
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    .then(handleResponse)
  }

  post(path, body = {}, { params, queryParams } = {}) {
    return fetch(
      this.getFullUrl(path, params, queryParams),
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )
    .then(handleResponse)
  }

  postData(path, data = '', { params, queryParams, headers = {} } = {}) {
    return fetch(
      this.getFullUrl(path, params, queryParams),
      {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers,
      }
    )
    .then(handleResponse)
  }

  put(path, body = {}, { params, queryParams } = {}) {
    return fetch(
      this.getFullUrl(path, params, queryParams),
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )
    .then(handleResponse)
  }

  delete(path, { params, queryParams } = {}) {
    return fetch(
      this.getFullUrl(path, params, queryParams),
      {
        method: 'DELETE',
        credentials: 'include',
      }
    )
    .then(handleResponse)
  }
}

function handleResponse(response) {
  return response.json()
    .then(json => {
      if (response.ok) return json
      
      return Promise.reject(json)
    })
}
