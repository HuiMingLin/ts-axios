import { isDate, isPlainObject } from './uitl'
import { resolve } from 'url';

interface URLOrigin {
  protocol: string;
  host: string;
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%24/g, '$')
    .replace(/%20/g, '+')
    .replace(/%2C/gi, ',')
    .replace(/%3A/gi, ':')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val == null) return
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const marIndex = url.indexOf('#')
    if (~marIndex) {
      url = url.slice(0, marIndex)
    }

    url += (~url.indexOf('?') ? '&' : '?') + serializedParams
  }
  return url
}
  
export function isURLSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveUrl(requestUrl)
  return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)

function resolveUrl(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
