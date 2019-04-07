import {h, Component} from 'preact'
import styled from './emotion-styled'

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

let EmotionTestContent = (props) =>
<div>
  <EmotionStyledTest><div>emotion tester here</div></EmotionStyledTest>
	<EmotionStyledPropsTest someColorProp='blue'><div>emotion tester here</div></EmotionStyledPropsTest>
  <EmotionStyledNoTypesTest someColorProp='blue'><div>emotion tester here</div></EmotionStyledNoTypesTest>
	<EmotionStyledPropsTest shouldGiveErrorHere><div>emotion tester here</div></EmotionStyledPropsTest>
</div>

export class Home extends Component {
	a = 1;
	render() {
		return (
			<div id="home">
				<h1>Hello</h1>
        <EmotionTestContent/>
			</div>
		);
	}
}

export default Home