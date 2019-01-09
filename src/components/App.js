import React, { Component } from 'react';

import CardGrid from './CardGrid';

import  { gradients } from '../data';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>React Animated Card Modal</h1>
        <CardGrid gradients={gradients} />
      </div>
    );
  }
}

export default App;
