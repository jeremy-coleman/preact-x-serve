import {h, Component} from 'preact'
import styled from './emotion-styled'

import {DemoPage} from './preact-live/DemoPage'
import { EmotionTest } from 'EmotionTest';

type ExplicitlyDefinedProps = {
  someColorProp: 'green' | 'blue'
}

let EmotionStyledTest = styled('div')({
  backgroundColor: 'red'
})

let EmotionStyledPropsTest = styled<ExplicitlyDefinedProps>('div')(props => ({
  backgroundColor: props.someColorProp || 'green'
}))

//you can define whatever types without having to explicity define them and dont have to cast as any
let EmotionStyledNoTypesTest = styled('div')(props => ({
  backgroundColor: props.someColorProp || 'green'
}))

/** 
 * hover over the 'someColorProp='blue' to see the difference
 * to type your components just add an interface or type after styled, like the example above, ie: styled<MyType>
 * the styled props behave just like a functional component, these are mostly equivalent: 
 * 		function MyDiv(props){<div>{props.whatever}</div>}
 * 		let MyDiv = props => <div>{props.whatever}</div>
 * 		styled('div')(props => 
 * 		styled('div')((props) => 
 * 		styled('div')(({whatever}) => (without passthrough)
 *  	styled('div')(({whatever, ...props}) => (with passthrough)
 * 
 * 
 * 	<EmotionStyledPropsTest shouldGiveErrorHere><div>emotion tester here</div></EmotionStyledPropsTest>
*/

let EmotionTestContent = (props) =>
<div>
  <EmotionStyledTest><div>emotion tester here</div></EmotionStyledTest>
	<EmotionStyledPropsTest someColorProp='blue'><div>emotion tester here</div></EmotionStyledPropsTest>
  <EmotionStyledNoTypesTest someColorProp='blue'><div>emotion tester here</div></EmotionStyledNoTypesTest>
</div>

export class Home extends Component {
	a = 1;
	render() {
		return (
			<div id="home">
				<h1>Hello</h1>
				<div>{String.raw`() => <div>XXXXXXXXXX</div>`}</div>
        <EmotionTestContent/>
				<DemoPage/>
				<EmotionTest/>
			</div>
		);
	}
}

export default Home