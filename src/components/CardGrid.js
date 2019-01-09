import React, { Component } from 'react';

import Card from './Card';

class CardGrid extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { gradients } = this.props;

    return (
      <div className="cardGrid">
        {gradients.map(item => (
          <Card
            key={item.name}
            name={item.name}
            primary={item.primary}
            secondary={item.secondary}
          />
        ))}
      </div>
    );
  }
}

export default CardGrid;