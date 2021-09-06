export const toQueryString = params => 
  Object.keys(params)
    .map((key, i) =>
      (i === 0 ? '?' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&')

export const passParams = (route, params) => {
  for (const key in params) {
    route = route.split(`:${key}`)
    if (route.length === 1) throw new Error('No param key found in provided route')
    route = route.join(params[key])
  }

  return route
}
