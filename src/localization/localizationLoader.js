import { useEffect, useState } from 'react'

const supportedLanguages = JSON.parse(process.env.REACT_APP_SUPPORTED_LANGS || `[ "en" ]`)
const defaultLanguage = process.env.REACT_APP_DEFAULT_LANG

export const getUserLang = () => {
  const userLang = localStorage.getItem('language') || navigator.language || navigator.userLanguage

  return supportedLanguages.includes(userLang) ? userLang : supportedLanguages[0]
}

export const localizationLoader = async (page) => {
  const modulePath = './' + page + '_' + (defaultLanguage || getUserLang())
  let moduleData

  try {
    moduleData = await import(`${modulePath}`) // tricky, but shoild be wrapped to quotes for use async module import
  } catch (err) {
    if (err.message.includes('Cannot find module')) {
      moduleData = await import('./' + page + '_en')
    } else {
      throw err
    }
  }

  return moduleData
}

export const useLocalization = (page) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    localizationLoader(page)
      .then(data => {
        setData(data)
      })
      .catch(error => {
        throw error
      })
  }, [page])

  return [data]
}

export const useLanguageState = () => {
  const [lang, setLanguageValue] = useState(getUserLang())

  const setLanguage = (value) => {
    localStorage.setItem('language', value)

    setLanguageValue(value)
  }

  return [lang, setLanguage]
}
