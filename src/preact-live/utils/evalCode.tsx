import { Component } from 'preact';
import {h} from 'preact'
import * as Preact from 'preact'

//import Preact from 'preact'

import { _poly } from './transform'

export const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  const res = new Function('_poly', 'Preact', ...scopeKeys, code)
  return res(_poly, Preact, ...scopeValues)
}

export default evalCode
