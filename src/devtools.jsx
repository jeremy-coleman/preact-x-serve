import { createElement, Component, memo, Fragment } from "preact/compat";

//import { createElement, Component, memo, Fragment } from "preact/hooks";

function Foo() {
	return <div>I'm memoed</div>;
}

const Memoed = memo(Foo);

export default class DevtoolsDemo extends Component {
	render() {
		return (
			<div>
				<h1>memo()</h1>
				<p><b>functional component:</b></p>
				<Memoed />
			</div>
		);
	}
}
