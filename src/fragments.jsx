import { createElement, Component, Fragment } from 'preact';

export default class extends Component {

  state = { number: 0 }

  componentDidMount() {
    setInterval(_ => this.updateChildren(), 1000);
  }

  updateChildren() {
    this.setState(state => ({ number: state.number + 1 }))
  }

  render(props, state) {
    return (
      <div>
        <div>{state.number}</div>
        <Fragment>
          <div>onezz</div>
          <div>{state.number}</div>
          <div>three</div>
        </Fragment>
      </div>
    )
  }
}
