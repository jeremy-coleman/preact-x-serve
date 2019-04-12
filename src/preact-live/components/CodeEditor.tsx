import { Component, Fragment } from 'preact';
import {h} from 'preact'
//import PropTypes from 'prop-types';
import {Editor} from './SimpleEditor';
import {Highlight} from './Highlight';
import Prism from '../vendor/prism'
import { theme as liveTheme } from '../themes/_current';

export class CodeEditor extends Component<any, any>{

  static getDerivedStateFromProps(props, state) {
    if (props.code !== state.prevCodeProp) {
      return { code: props.code, prevCodeProp: props.code };
    }

    return null;
  }

  state = {
    code: ''
  };

  updateContent = code => {
    this.setState({ code }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.code);
      }
    });
  };

  highlightCode = code => (
    <Highlight
      Prism={Prism}
      code={code}
      theme={this.props.theme || liveTheme}
      language={this.props.language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  render() {
    const { style, code: _code, onChange, language, ...rest } = this.props;
    const { code } = this.state;

    return (
      <Editor
        value={code}
        padding={10}
        highlight={this.highlightCode}
        onValueChange={this.updateContent}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...style
        }}
        {...rest}
      />
    );
  }
}

export default CodeEditor;
