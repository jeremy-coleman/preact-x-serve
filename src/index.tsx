import { h, render, Component, Fragment} from 'preact';
import * as Preact from 'preact'
//@ts-ignore
window.h = h


//@ts-ignore

import * as React from 'preact/compat'
window.React = React
window.Preact = Preact

//import * as Preact from 'preact'
// mobx-state-tree fix
//@ts-ignore

window.setImmediate = setTimeout;
//window.Preact = Preact

import './style.css';
import { Router, Link } from './router';
import Pythagoras from './pythagoras';
import Spiral from './spiral';
import Reorder from './reorder';
import Todo from './todo';
import Fragments from './fragments';
import Context from './context';
import installLogger from './logger';
import ProfilerDemo from './profiler';
import KeyBug from './key_bug';
import Home from './Home'

//var initDevTools = (process.env.NODE_ENV !== "production" && require('preact/debug/src/devtools').initDevTools) || void 0
//var initDebug = (process.env.NODE_ENV !== "production" && require('preact/debug/src/debug').initDebug) || void 0

import DevtoolsDemo from './devtools';

let isBenchmark = /(\/spiral|\/pythagoras|[#&]bench)/g.test(window.location.href);

if (!isBenchmark) {
	// eslint-disable-next-line no-console
	console.log('Enabling devtools and debug');
	//initDevTools();
	//initDebug();
}



class DevtoolsWarning extends Component {
	onClick = () => {
		window.location.reload();
	}

	render() {
		return (
			<button onClick={this.onClick}>Start Benchmark (disables devtools)</button>
		);
	}
}

class App extends Component {
	render({ url }) {
		return (
			<div class="app">
				<header>
					<nav>
						<Link href="/" activeClassName="active">Home</Link>
						<Link href="/reorder" activeClassName="active">Reorder</Link>
						<Link href="/spiral" activeClassName="active">Spiral</Link>
						<Link href="/pythagoras" activeClassName="active">Pythagoras</Link>
						<Link href="/todo" activeClassName="active">ToDo</Link>
						<Link href="/fragments" activeClassName="active">Fragments</Link>
						<Link href="/key_bug" activeClassName="active">Key Bug</Link>
						<Link href="/profiler" activeClassName="active">Profiler</Link>
						<Link href="/context" activeClassName="active">Context</Link>
						<Link href="/devtools" activeClassName="active">Devtools</Link>
						<Link href="/empty-fragment" activeClassName="active">Empty Fragment</Link>
					</nav>
				</header>
				<main>
					<Router url={url}>
						<Home path="/" />
						<Reorder path="/reorder" />
						<div path="/spiral">
							{!isBenchmark
								? <DevtoolsWarning />
								: <Spiral />
							}
						</div>
						<div path="/pythagoras">
						{!isBenchmark
							?	<DevtoolsWarning /> : <Pythagoras/>
						}
						</div>
						<Todo path="/todo" />
						<Fragments path="/fragments" />
						<ProfilerDemo path="/profiler" />
						<KeyBug path="/key_bug" />
						<Context path="/context" />
						<DevtoolsDemo path="/devtools" />
						<EmptyFragment path="/empty-fragment" />
					</Router>
				</main>
			</div>
		);
	}
}

function EmptyFragment() {
	return <Fragment />;
}


installLogger(
	String(localStorage.LOG)==='true' || location.href.match(/logger/),
	String(localStorage.CONSOLE)==='true' || location.href.match(/console/)
);

render(<App />, document.body);

//@ts-ignore
if(module.hot){module.hot.accept()}