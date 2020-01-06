import { isPlainObject, deepMerge } from './uitl'
import { AxiosMethod } from '../types';

const CONTENT_TYPE = 'Content-Type'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, CONTENT_TYPE)

  if (isPlainObject(data)) {
    if (headers && !headers[CONTENT_TYPE]) {
      headers[CONTENT_TYPE] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: AxiosMethod): any {
  if(!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodToDelete = ['delete', 'get', 'head', 'options',
    'post', 'put', 'patch', 'common']

  methodToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}

