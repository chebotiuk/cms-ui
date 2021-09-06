import plainConfig from './config'

function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function wrapConfig (object, prevProps = []) {
  return new Proxy(object, {
    get (target, prop) {
      if (prop in target) {
        return (isPlainObject(target[prop]))
          ? wrapConfig(target[prop], [...prevProps, prop])
          : target[prop]
      } else {
        throw new Error(`Config value \`${[...prevProps, prop].join('.')}\` is not defined`)
      }
    },
  })
}

const defaultConfig = plainConfig.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = plainConfig[environment];
const finalConfig = {
  ...defaultConfig,
  ...environmentConfig,
}

export const config = wrapConfig(finalConfig)
