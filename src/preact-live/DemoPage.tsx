import {h} from 'preact'
import { Component } from 'preact';
import styled from 'styled-components';
import * as polished from 'polished';

import {LiveEdit} from './LiveEdit';

const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: ${polished.rem(1024)};
  padding: ${polished.rem(20)};
  padding-bottom: ${polished.rem(100)};
  text-align: center;
`;

const Description = styled.p`
  color: white;
  margin-bottom: ${polished.rem(10)};
  margin-top: ${polished.rem(50)};
`;

// const componentClassExample = `
// class Counter extends Preact.Component {
//   constructor() {
//     super()
//     this.state = { count: 0 }
//   }
//   componentDidMount() {
//     this.interval = setInterval(() => {
//       this.setState(state => ({ count: state.count + 1 }))
//     }, 1000)
//   }
//   componentWillUnmount() {
//     clearInterval(this.interval)
//   }
//   render() {
//     return (
//       <center>
//         <h3>
//           {this.state.count}
//         </h3>
//       </center>
//     )
//   }
// }
// `.trim();

const pfcExample = `
() => (
  <h3>
    So functional. Much wow!
  </h3>
)
`.trim();

const jsxExample = `
<h3>
  Hello World!
</h3>
`.trim();

// const noInlineExample = `
// const Wrapper = ({ children }) => (
//   <div style={{
//     background: 'papayawhip',
//     width: '100%',
//     padding: '2rem'
//   }}>
//     {children}
//   </div>
// )
// const Title = () => (
//   <h3 style={{ color: 'palevioletred' }}>
//     Hello World!
//   </h3>
// )
// render(
//   <Wrapper>
//     <Title />
//   </Wrapper>
// )
// `.trim();

export class DemoPage extends Component<any, any> {
  render() {
    return (
      <Container>
        <Description>Or some pure functional components...</Description>
        <LiveEdit code={pfcExample} />

        <Description>Or just some JSX code!</Description>
        <LiveEdit code={jsxExample} />
      </Container>
    );
  }
}

export default DemoPage;