import { transform as _transform } from 'buble'
//import assign from 'core-js/fn/object/assign'

const {assign} = Object
export const _poly = { assign }

const opts = {
  jsx: 'h',
  //objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
}

export default code => _transform(code, opts).code
