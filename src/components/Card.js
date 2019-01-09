import React, { Component, Fragment } from 'react';

import Modal from './Modal';
import CardModal from './CardModal';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maximised: false,
      dimensions: {

      }
    };

    this.cardRef = React.createRef();
  }

  toggle = () => {
    // Set state with new measurements every time a Card is clicked
    const dimensions = this.measure();
    this.setState({
      maximised: !this.state.maximised,
      dimensions
    });
  }

  toggleMaxFalse = () => {
    this.setState({ maximised: false });
  }

  measure = () => {
    // Return current dimensions of Card
    const rect = this.cardRef.current.getBoundingClientRect();
    const dimensions = {
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
      x: rect.x,
      y: rect.y
    };
    return dimensions;
  }

  componentDidMount() {
    this.setState({ dimensions: this.measure() });
  }

  render() {
    const { name, primary, secondary } = this.props;
    const { maximised, dimensions } = this.state;

    const classes = maximised ? 'card cardHide' : 'card';
    
    return (
      <Fragment>
        <div
          className={classes}
          style={{
            background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
            border: `2px solid ${primary}`
          }}
          onClick={this.toggle}
          ref={this.cardRef}
        >
          <h3 style={{ color: primary }}>{name}</h3>
        </div>
        {maximised && (
          <Modal>
            <CardModal
              primary={primary}
              secondary={secondary}
              name={name}
              dimensions={dimensions}
              unmountAction={this.toggleMaxFalse}
              measureAction={this.measure}
            />
          </Modal>
        )}
      </Fragment>
    )
  }
}

export default Card;