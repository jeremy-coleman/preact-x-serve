import {css, cx, Interpolation} from 'emotion'
//import {h} from 'preact'
import {h} from 'preact'

//import * as React from 'react'

type DomProps = JSX.DOMAttributes & JSX.HTMLAttributes

type Proptional<T> = Interpolation | ((...args: T[]) => Interpolation)

export function styled<P>(C) {
  return (...props: Proptional<P>[]) => {
    const Comp = (originalProps: P & DomProps) => {
      const className = cx([
        originalProps.className,
        ...props.map(a => typeof a === 'function' ? a(originalProps) : a)
        .filter(s => !!s)
        .map(s => css(s))
      ])

      return h(C, ({className, ...originalProps, props}))
    }

    return Comp
  }
}

export default styled