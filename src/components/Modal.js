import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('modal');

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    root.appendChild(this.el);
  }

  componentWillUnmount() {
    root.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Modal;