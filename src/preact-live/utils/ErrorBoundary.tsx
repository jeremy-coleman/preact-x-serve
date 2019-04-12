import { Component } from 'preact';
import {h} from 'preact'

export const ErrorBoundary = (Tag, errorCallback) => {
  return class ErrorBoundary extends Component<any, any> {
    componentDidCatch(error) {
      errorCallback(error);
    }

    render() {
      return typeof Tag === 'function' ? <Tag/> : Tag
    }
  }
}

export default ErrorBoundary
