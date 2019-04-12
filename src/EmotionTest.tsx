// import { observable } from 'mobx';
// import { observer } from 'mobx-react';
import {h} from 'preact'
import { css, styled, withStyles, stylesheet } from './emotion-styled';


let csxcss1 = css({
  backgroundColor: 'yellow',
  border: 'peach 5px solid',
  ':hover': {
    backgroundColor: 'black'
  }
})

let csxcss3 = css({
  backgroundColor: 'gray',
  border: 'gray 5px solid',
  ':hover': {
    backgroundColor: 'black'
  }
})

// let csxcss = observable.box(csxcss1)
// csxcss.set(csxcss3)


const child = css({
  backgroundColor: 'aqua',
  color: 'black',
  '> span': {
    color: 'tomato'
  }
})

let someObject = {

}

let CxsChild = props => <div className={child} {...props}>im black CSX WITH '> SPAN' Selector<span>im tomato</span></div>
let CxsChildWithStyles = withStyles(CxsChild, {backgroundColor: 'green'})

//Give me your tired, your poor,Your huddled masses yearning to breathe free
let CxsChildWithStylesAndNewProps = withStyles(CxsChild, (props => ({backgroundColor: props.bg || 'red'})))

let CxsDiv = props => <div className={css({backgroundColor: 'yellow', border: 'green 5px solid'})} {...props}>cxs div</div>

let CxsDiv2 = props => <div className={csxcss3} {...props}>cxs div2</div>

//let CxsDivMobxOverride = props => <div className={csxcss} {...props}>if this is gray mobx.box.set() works else if peach failed</div>



let StyledTester = styled('div')({
  backgroundColor: 'orange',
  border: 'teal 5px solid'
})

type BgProp = {
  bg?: 'green' | 'blue'
}

let CsxStyledWithProps = styled<BgProp>('div')(props => ({
  backgroundColor: props.bg || 'red',
  height: '50px',
  ':hover': {
    color: 'black',
    backgroundColor: 'purple'
  }
}))

let WrapperTest = styled(StyledTester)(({
  backgroundColor: 'blue'
}))


let cxsStylesheet = stylesheet({
  root: {
    background: 'green'
  }
})

export let WithStylesheetEz = (props) =>
<div>
  <div className={cxsStylesheet.root}>Using a stylesheet object, cool</div>
</div>



export let EmotionTest = (props) =>
<div>
  <CxsChild />
  <CxsChildWithStyles>withStyles works if green</CxsChildWithStyles>
  <CxsChildWithStylesAndNewProps/>
  <CxsChildWithStylesAndNewProps bg="purple"/>
  <CxsDiv/>
  <CxsDiv2></CxsDiv2>
  <StyledTester>typestyled no props</StyledTester>
  <WrapperTest>overriding the above by wrapping with {String.raw`styled(ComponentName){backgroundColor: blue}`}</WrapperTest>
  <CsxStyledWithProps>
    {String.raw`hover me for black`}
  </CsxStyledWithProps>
  <WithStylesheetEz/>
</div>

