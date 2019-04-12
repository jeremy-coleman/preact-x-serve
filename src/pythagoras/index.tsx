import { h, Component , createRef} from 'preact';
// import {mouse , select} from './select';
// import { scaleLinear } from 'd3-scale';
import Pythagoras from './pythagoras';

//https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
// * var scaleFunction = linearScale([0, 1], [0, 100]);
// * scaleFunction(0.5); // 50
// *
// * // clamp option ensures that output is within range
// * var scaleFunction = linearScale([0, 1], [0, 10], true);
// * scaleFunction(100); // 10
// */

function linearScale(domain, range, clamp?) {
  return function(value) {
    if (domain[0] === domain[1] || range[0] === range[1]) {
      return range[0];
    }
    var ratio = (range[1] - range[0]) / (domain[1] - domain[0]),
      result = range[0] + ratio * (value - domain[0]);
    return clamp ? Math.min(range[1], Math.max(range[0], result)) : result;
  };
}

export default class PythagorasDemo extends Component {
	svg = {
		width: 1280,
		height: 600
	};

	state = {
		currentMax: 0,
		baseW: 80,
		heightFactor: 0,
		lean: 0
	};

	realMax = 11;


	svgRef = createRef<SVGElement>()

	// c => {
	// 	this.svgElement = c;
	// };

	// scaleFactor = scaleLinear().domain([this.svg.height, 0]).range([0, .8]);
	// scaleLean = scaleLinear().domain([0, this.svg.width/2, this.svg.width]).range([.5, 0, -.5]);

	scaleFactor = linearScale([this.svg.height, 0], [0, .8]);
	scaleLean = linearScale([0, this.svg.width/2, this.svg.width], [.5, 0, -.5]);

	// onMouseMove = event => {
	// 	let svgBounds = this.svgRef.current.getBoundingClientRect()
	// 	let y= svgBounds.height
	// 	let x= svgBounds.width
		 
	// 	this.setState({
	// 		heightFactor: this.scaleFactor(y),
	// 		lean: this.scaleLean(x)
	// 	});
	// };


	restart = () => {
		this.setState({ currentMax: 0 }),
		this.next();
	};

	next = () => {
		let { currentMax } = this.state;

		if (currentMax < this.realMax) {
			this.setState({ currentMax: currentMax + 1 });
			this.timer = setTimeout(this.next, 500);
		}
	};

	timer;
	//selected: ClientRect | DOMRect;
	//selected: any;

	componentDidMount() {
		//this.selected = this.svgRef.current.getBoundingClientRect()
		this.svgRef.current.addEventListener('mousemove', e => {
		let y= e.clientY
		let x= e.clientX
		this.setState({
			heightFactor: this.scaleFactor(y),
			lean: this.scaleLean(x)
		})
		//this.selected = select(this.svgElement).on('mousemove', this.onMouseMove);
	})
		this.next();
}


	componentWillUnmount() {
		this.svgRef.current.removeEventListener('mousemove', null)
		//this.selected.on('mousemove', null);
		clearTimeout(this.timer);
	}

	render({ }, { currentMax, baseW, heightFactor, lean }) {
		let { width, height } = this.svg

		return (
			<div class="App">
				<svg width={width} height={height} ref={this.svgRef}>
					<Pythagoras
						w={baseW}
						h={baseW}
						heightFactor={heightFactor}
						lean={lean}
						x={width/2-40}
						y={height-baseW}
						lvl={0}
						maxlvl={currentMax}
					/>
				</svg>
			</div>
		);
	}
}
