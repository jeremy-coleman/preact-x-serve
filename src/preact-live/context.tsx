import { Component, createContext, h } from 'preact';
import Editor from './components/CodeEditor';
import { generateElement, renderElementAsync } from './utils/transpile';


export const LiveContext = createContext<any>({});

export function LiveEditor(props: any) {
  return (
    <LiveContext.Consumer>
      {({ code, language, theme, disabled, onChange }) => (
        <Editor
          theme={theme}
          code={code}
          language={language}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      )}
    </LiveContext.Consumer>
  );
}


export function LiveError(props: any) {
  return (
    <LiveContext.Consumer>
      {({ error }) => (error ? <pre {...props}>{error}</pre> : null)}
    </LiveContext.Consumer>
  );
}

export function LivePreview({ Component = 'div', ...rest }) {
  return (
    <Component {...rest}>
      <LiveContext.Consumer>
        {({ element: Element }) => Element && <Element />}
      </LiveContext.Consumer>
    </Component>
  );
}

export function withLive(WrappedComponent) {
  class WithLive extends Component {
    render() {
      return (
        <LiveContext.Consumer>
          {live => <WrappedComponent live={live} {...this.props} />}
        </LiveContext.Consumer>
      );
    }
  }

  return WithLive;
}

type LiveProviderProps = {
  code?: any
  scope?:any
  noInline?: any
  transformCode?: any,
  disabled?: boolean,
  className?: any
  class?: any,
  language?: string,
  theme?: any
}

export class LiveProvider extends Component<LiveProviderProps, any> {
  static defaultProps = {
    code: '',
    noInline: false,
    language: 'jsx',
    disabled: false,
    className: ''
  };

  // static propTypes = {
  //   className: PropTypes.string,
  //   code: PropTypes.string,
  //   language: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   theme: PropTypes.object,
  //   scope: PropTypes.object,
  //   noInline: PropTypes.bool,
  //   transformCode: PropTypes.func
  // };

  onChange = code => {
    const { scope, transformCode, noInline } = this.props;
    this.transpile({ code, scope, transformCode, noInline });
  };

  onError = error => {
    this.setState({ error: error.toString() });
  };

  transpile = ({ code, scope, transformCode, noInline = false }) => {
    // Transpilation arguments
    const input = {
      code: transformCode ? transformCode(code) : code,
      scope
    };

    const errorCallback = err =>
      this.setState({ element: undefined, error: err.toString() });
    const renderElement = element => this.setState({ ...state, element });

    // State reset object
    const state = { unsafeWrapperError: undefined, error: undefined };

    try {
      if (noInline) {
        this.setState({ ...state, element: null }); // Reset output for async (no inline) evaluation
        renderElementAsync(input, renderElement, errorCallback);
      } else {
        renderElement(generateElement(input, errorCallback));
      }
    } catch (error) {
      this.setState({ ...state, error: error.toString() });
    }
  };

  componentWillMount() {
    const { code, scope, transformCode, noInline } = this.props;

    this.transpile({ code, scope, transformCode, noInline });
  }

  componentDidUpdate({
    code: prevCode,
    scope: prevScope,
    noInline: prevNoInline,
    transformCode: prevTransformCode
  }) {
    const { code, scope, noInline, transformCode } = this.props;
    if (
      code !== prevCode ||
      scope !== prevScope ||
      noInline !== prevNoInline ||
      transformCode !== prevTransformCode
    ) {
      this.transpile({ code, scope, transformCode, noInline });
    }
  }

  render() {
    const {
      children,
      code,
      language,
      theme,
      noInline,
      transformCode,
      disabled,
      scope,
      className,
      ...rest
    } = this.props;

    return (
      <LiveContext.Provider
        value={{
          ...this.state,
          code,
          language,
          theme,
          disabled,
          onError: this.onError,
          onChange: this.onChange
        }}
      >
        {children}
      </LiveContext.Provider>
    );
  }
}


export default LiveProvider