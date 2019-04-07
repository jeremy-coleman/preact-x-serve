import { Component } from 'preact';
import {h} from 'preact'
import Preact from 'preact/compat'

import { _poly } from './transform'

const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  const res = new Function('_poly', 'Preact', ...scopeKeys, code)
  return res(_poly, React, ...scopeValues)
}

export default evalCode
