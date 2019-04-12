import {css, cx, Interpolation} from 'emotion'
//import {h} from 'preact'
import {h, VNode} from 'preact'

//import * as React from 'react'

type DomProps = JSX.DOMAttributes & JSX.HTMLAttributes

type Proptional<T> = Interpolation | ((...args: T[]) => Interpolation);

//export function styled<P>(C) {

//allows any props if no props are passed, but if you provide a type, it will be strict , change to styled<P>(C) to make default strict
export function styled<P = any>(C) {
  return (...props: Proptional<P>[]) => {
    const Comp = (originalProps: P & DomProps) => {
      const className = cx([
        originalProps.className,
        ...props.map(a => typeof a === 'function' ? a(originalProps) : a)
        .filter(s => !!s)
        .map(s => css(s))
      ])

      return h(C, ({className, ...originalProps, props})) as VNode<P>
    }

    return Comp
  }
}

export let withStyles = (c, s) => styled(c)(s);


export declare type CSSClassNames<K extends string> = Record<K, string>;

export function stylesheet<T extends string = any>(classes: Record<T, Interpolation>): CSSClassNames<T> {
  //let $debugName = this.constructor.name.toString()
  const classNames = Object.getOwnPropertyNames(classes) as (T)[];
  const result = {} as CSSClassNames<T>
  for (let className of classNames) {
    const classDef = classes[className] as Interpolation
    if (classDef) {
      //$debugName = className
      //classDef.$debugName = className
      result[className] = css(classDef);
    }
  }
  return result as Record<T, string>;
}


export {css, cx}

export default styled



// //------------------trying for v10 compat ---------------------------//
// type EmotionDOM = { css?: Interpolation, theme?: any }
// type EmotionNext = DomProps & EmotionDOM
// type InternalNext = Partial<EmotionNext>

// //EmotionNext & {className?: any, class?: any}

// const defined = (...args) => {
//   for (var i = 0; i < args.length; i++) {
//     if (args[i] !== undefined) return args[i]
//   }
// }

// export function styledWITHCSS<P>(C) {
//   return (...args: Proptional<P & any>[]) => {
//     let StyledComponent = (props: P & EmotionNext) => {

//       let stylePropKeys = [...Object.keys({}), 'css']
      
//       //@ts-ignore -- where would theme context live?? Component.theme? Component.props.theme? Component.state.context? Component.context? Component.props.context?
//       let styleProps = Object.assign({ theme: defined(StyledComponent.context.theme, props.theme, {}) }, props)

//       let next: InternalNext = {}

//       for (let key in props) {
//         if ([...Object.keys({}), 'css'].includes(key)) continue
//         next[key] = props[key]
//       }
      
//       next.className = cx([
//         next.className,
//         ...args
//           .map(proptional => (typeof proptional === 'function' ? proptional(props) : proptional))
//           .filter(s => !!s)
//           .map(s => css(s)),
//         css(props.css || {})
//       ])

//       return h(C, next)
//     }

//     return StyledComponent
//   }
// }