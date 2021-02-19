// A range slider for the filter section

import React from 'react';
import addCommaPrice from '../util/addCommaPrice';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.handleMove = this.handleMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.dragContainer = React.createRef();

    this.state = {
      mouseDown: false,
      currentHandle: null,
      currentMin: props.min,
      currentMax: props.max,
    };
  }

  componentDidMount() {
    // Handle mouse up no matter where the user releases the mouse
    window.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseUp() {
    // Stop moving slider once mouse is up
    this.setState({ mouseDown: false, currentHandle: null });
  }

  componentWillUnmount() {
    // Remove listener once component is destroyed
    window.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  getDistance(min) {
    // Return distance from left or right for positioning purposes (in %)
    return min
      ? (100 * (this.state.currentMin - this.props.min)) /
          (this.props.max - this.props.min)
      : (100 * (this.props.max - this.state.currentMax)) /
          (this.props.max - this.props.min);
  }

  handleMouseDown(e) {
    this.setState(
      (state, props) => ({
        mouseDown: true,
        // Move the nearest slider handle to the mouse
        currentHandle:
          Math.abs(this.getMousePos(e) - state.currentMin) <
          Math.abs(this.getMousePos(e) - state.currentMax)
            ? 'min'
            : 'max',
      }),
      () => {
        // Move slider handle to mouse
        this.handleMove(e);
      }
    );
  }

  getMousePos(e) {
    //   Calculate fractional value of mouse position on slider scale
    const frac =
      (e.pageX - this.dragContainer.current.offsetLeft) /
      this.dragContainer.current.offsetWidth;
    //   Limit value to between 0 and 1 so slider handles don't overflow
    const limited = Math.min(1, Math.max(0, frac));
    // Transform values (0-1) to proper value scale (min-max)
    const adjusted =
      this.props.min + limited * (this.props.max - this.props.min);
    //   Snap slider handle to nearest step
    const rounded = Math.round(adjusted / this.props.step) * this.props.step;
    return rounded;
  }

  handleMove(e) {
    if (this.state.mouseDown) {
      const pos = this.getMousePos(e);
      this.setState((state, props) =>
        state.currentHandle === 'min'
          ? { currentMin: pos }
          : { currentMax: pos }
      );
    }
  }

  render() {
    return (
      <div
        className="py-6 select-none"
        onMouseMove={this.handleMove}
        onMouseDown={this.handleMouseDown}
        ref={this.dragContainer}
      >
        <div className="relative">
          {/* MIN HANDLE */}
          <div
            className="absolute bg-blue-600 rounded-full h-4.5 w-4.5 top-0.5 shadow-md transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: this.getDistance(true) + '%',
            }}
          ></div>
          <p
            className="text-blue-600 text-sm font-bold absolute transform -translate-x-1/2 translate-y-1/2"
            style={{
              left: this.getDistance(true) + '%',
            }}
          >
            {this.props.isPrice
              ? '$' + addCommaPrice(this.state.currentMin)
              : this.state.currentMin}
          </p>
          {/* MAX HANDLE */}
          <div
            className="absolute bg-blue-600 rounded-full h-4.5 w-4.5 top-0.5 shadow-md transform translate-x-1/2 -translate-y-1/2"
            style={{
              right: this.getDistance(false) + '%',
            }}
          ></div>
          <p
            className="text-blue-600 text-sm font-bold absolute transform translate-x-1/2 translate-y-1/2"
            style={{
              right: this.getDistance(false) + '%',
            }}
          >
            {this.props.isPrice
              ? '$' + addCommaPrice(this.state.currentMax)
              : this.state.currentMax}
          </p>

          <div
            className="absolute h-1.25 bg-blue-600"
            style={{
              left: this.getDistance(true) + '%',
              width:
                (100 * (this.state.currentMax - this.state.currentMin)) /
                  (this.props.max - this.props.min) +
                '%',
            }}
          ></div>
          <div className="h-1.25 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }
}

export default Slider;
