import { Component } from 'preact';
import {h} from 'preact'
const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
      errorCallback(error);
    }

    render() {
      return typeof Element === 'function' ?
        <Element/> :
        Element;
    }
  }
}

export default errorBoundary
