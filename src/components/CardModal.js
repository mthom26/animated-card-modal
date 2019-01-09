import React, { Component } from 'react';

class CardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: 'IDLE'
    };

    this.cardModalRef = React.createRef();
  }
  
  componentDidMount() {
    const { dimensions } = this.props;
    this.setState({ playing: 'OPENING' }); 

    const anim = this.cardModalRef.current.animate([
      { // animate from these values
        top: `${dimensions.top}px`,
        width: `${dimensions.width}px`,
        left: `${dimensions.left}px`,
        height: `${dimensions.height}px`
      },
      { // ...to these values
        top: `0px`,
        width: `100%`,
        left: `0px`,
        height: `100%`
      }
    ], { // Object containing timing and other settings for the animation
      duration: 450, easing: 'ease-in-out', fill: 'forwards'
    });
    
    anim.onfinish = () => {
      this.setState({ playing: 'IDLE' });
    }

    // Store animation for later use (when user interrupts animation)
    this.anim = anim;
  }

  unmount = () => {
    const dimensions = this.props.measureAction();
    this.setState({ playing: 'CLOSING' });

    const anim = this.cardModalRef.current.animate([
      {
        top: `0px`,
        width: `100%`,
        left: `0px`,
        height: `100%`
      },
      {
        top: `${dimensions.top}px`,
        width: `${dimensions.width}px`,
        left: `${dimensions.left}px`,
        height: `${dimensions.height}px`
      }
    ], { duration: 450, easing: 'ease-in-out' });
    anim.onfinish = () => {
      // This is the toggle method from Card component which sets maximised to
      // false and unmounts the CardModal
      this.props.unmountAction();
    };
  }

  onModalClick = () => {
    // Check the current animation state of the modal and update animation
    if(this.state.playing === 'OPENING') {
      this.setState({ playing: 'CLOSING' });
      this.anim.reverse();
      this.anim.onfinish = () => {
        this.props.unmountAction();
      };
    } else if(this.state.playing === 'IDLE') {
      this.unmount();
    } // else if playing === 'CLOSING' don't do anything with user interaction
  }

  render() {
    const { primary, secondary, name } = this.props;
  
    return (
      <div
        className="modalCard"
        style={{
          background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
          border: `2px solid ${primary}`
        }}
        onClick={this.onModalClick}
        ref={this.cardModalRef}
      >
        <h3 style={{ color: primary }}>{name}</h3>
      </div>
    )
  }
};

export default CardModal;