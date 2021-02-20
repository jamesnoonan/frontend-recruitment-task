// A range slider for the filter section

import React from 'react';
import addCommaPrice from '../util/addCommaPrice';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.handleMove = this.handleMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.setDistances = this.setDistances.bind(this);

    this.dragContainer = React.createRef();
    this.minText = React.createRef();
    this.maxText = React.createRef();

    this.state = {
      mouseDown: false,
      currentHandle: null,
      currentMin: props.min,
      currentMax: props.max,
      left: 0,
      right: 0,
      textLeft: 0,
      textRight: 0,
    };
  }

  componentDidMount() {
    // Handle mouse up no matter where the user releases the mouse
    window.addEventListener('mouseup', this.handleMouseUp, false);
    // Adjust text distances if browser is resized
    this.setDistances();
    window.addEventListener('resize', this.setDistances);
  }

  handleMouseUp() {
    // Stop moving slider once mouse is up
    this.setState({ mouseDown: false, currentHandle: null });
  }

  componentWillUnmount() {
    // Remove listeners once component is destroyed
    window.removeEventListener('resize', this.setDistances);
    window.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  setDistances() {
    this.setState((state, props) => ({
      left: this.getDistance(state, props, true),
      right: this.getDistance(state, props, false),
      textLeft: this.getDistance(state, props, true, true),
      textRight: this.getDistance(state, props, false, true),
    }));
  }

  getDistance(state, props, left, isText) {
    // Middle distance from left or right for positioning purposes (in %)
    const leftMid =
      (100 * (state.currentMin - props.min)) / (props.max - props.min);
    const rightMid =
      (100 * (props.max - state.currentMax)) / (props.max - props.min);
    const mid = left ? leftMid : rightMid;
    // If distance isn't for text, then simply return the mid point
    if (!isText) {
      return mid;
    }

    // Check if text is overflowing off either edge of the bar
    const overflowLeft =
      (leftMid / 100) * this.dragContainer.current.offsetWidth -
      this.minText.current.offsetWidth / 2;
    const overflowRight =
      (rightMid / 100) * this.dragContainer.current.offsetWidth -
      this.maxText.current.offsetWidth / 2;
    // Shift text to edge of slider handle
    const adjustment = 10;
    // Convert px to % of slider bar
    const overflowAmount =
      (100 * ((left ? overflowLeft : overflowRight) + adjustment)) /
      this.dragContainer.current.offsetWidth;
    // If the text is overflowing, return the adjusted mid point
    if (overflowAmount < 0) {
      return mid - overflowAmount;
    }

    // Check if text is crossing over each other

    // Check if text is also pressed against edge of slider
    const otherTextEdge = left ? overflowRight < 0 : overflowLeft < 0;
    const betweenTextWidth =
      this.maxText.current.offsetWidth / (left && otherTextEdge ? 1 : 2) +
      this.minText.current.offsetWidth / (!left && otherTextEdge ? 1 : 2);
    const textCrossover =
      betweenTextWidth -
      ((100 -
        ((left && otherTextEdge ? 0 : rightMid) +
          (!left && otherTextEdge ? 0 : leftMid))) /
        100) *
        this.dragContainer.current.offsetWidth;

    if (textCrossover > 0) {
      const crossoverRelative =
        (100 * (textCrossover + 10)) / this.dragContainer.current.offsetWidth;
      // The distance to shift the text so that it doesn't overflow
      const textOverflowShifted = crossoverRelative / (otherTextEdge ? 1 : 2);
      if (textOverflowShifted > overflowAmount) {
        // Return position of text at very end of slider
        return (
          (100 *
            (left
              ? this.minText.current.offsetWidth
              : this.maxText.current.offsetWidth)) /
          2 /
          this.dragContainer.current.offsetWidth
        );
      } else {
        // Return shifted text to avoid crossover
        return mid - textOverflowShifted;
      }
    }

    return mid;
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
      this.setState((state, props) => {
        // Check if slider handles are at least one step apart
        const isStepApart =
          state.currentHandle === 'min'
            ? pos + props.step <= state.currentMax
            : pos >= state.currentMin + props.step;
        // If far enough apart, then set new position
        if (isStepApart) {
          return state.currentHandle === 'min'
            ? { currentMin: pos }
            : { currentMax: pos };
        } else {
          return {};
        }
      }, this.setDistances);
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
              left: this.state.left + '%',
            }}
          ></div>
          <p
            className="text-blue-600 text-sm font-bold absolute transform -translate-x-1/2 translate-y-1/2"
            ref={this.minText}
            style={{
              left: this.state.textLeft + '%',
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
              right: this.state.right + '%',
            }}
          ></div>
          <p
            className="text-blue-600 text-sm font-bold absolute transform translate-x-1/2 translate-y-1/2"
            ref={this.maxText}
            style={{
              right: this.state.textRight + '%',
            }}
          >
            {this.props.isPrice
              ? '$' + addCommaPrice(this.state.currentMax)
              : this.state.currentMax}
          </p>

          <div
            className="absolute h-1.25 bg-blue-600"
            style={{
              left: this.state.left + '%',
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
