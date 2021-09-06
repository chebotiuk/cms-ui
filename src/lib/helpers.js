// @ts-check
import { memoize } from 'lodash'

export { passParams } from './url'

/** @param {string} path */
/** @param {(a: string) => {}} textResolver */
export const breadcrumbsParser = (path, textResolver) => {
  const splittedPath = path.split('/')
  const breadcrumbs = []

  splittedPath.reduce((previousValue, currentItem, i) => {
    if (currentItem.length === 0) return previousValue

    const target = {
      href: previousValue.href + '/' + currentItem,
      text: textResolver(currentItem),
    }

    breadcrumbs.push(target)
    return target
  }, {
    href: '',
    text: '',
  })

  breadcrumbs.unshift({
    href: '/',
    text: textResolver('home')
  })

  return breadcrumbs
}

export const breadcrumbsParserMemoized = memoize(breadcrumbsParser)

// Date related
const dateFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export function formatDate (ISOString) {
  return new Date(ISOString).toLocaleString('en-US', dateFormatOptions)
}
