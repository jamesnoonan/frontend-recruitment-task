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
    // If finished dragging update filters
    if (this.state.mouseDown) {
      this.props.setFilterValues(this.props.isPrice ? 'price' : 'size', {
        min: this.state.currentMin,
        max: this.state.currentMax,
      });
    }
    // Stop moving slider once mouse is up
    this.setState({ mouseDown: false, currentHandle: null });
  }

  componentWillUnmount() {
    // Remove listeners once component is destroyed
    window.removeEventListener('resize', this.setDistances);
    window.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  setDistances() {
    this.setState((state, props) => {
      // Middle distance from left or right for positioning purposes (in %)
      const leftMid =
        (100 * (state.currentMin - props.min)) / (props.max - props.min);
      const rightMid =
        (100 * (props.max - state.currentMax)) / (props.max - props.min);
      const { minTextPos, maxTextPos } = this.getTextDistances(
        leftMid,
        rightMid
      );
      return {
        left: leftMid,
        right: rightMid,
        textLeft: minTextPos,
        textRight: maxTextPos,
      };
    });
  }

  getTextDistances(leftMid, rightMid) {
    let minTextPos = leftMid;
    let maxTextPos = rightMid;

    const minTextWidth = this.minText.current.offsetWidth;
    const maxTextWidth = this.maxText.current.offsetWidth;
    const barWidth = this.dragContainer.current.offsetWidth;

    // The distance to keep between the text
    const adjustment = 10;

    // Check if text is crossing over each other

    // The combined amount that the text sticks out from the slider handles
    const betweenTextWidth = (maxTextWidth + minTextWidth) / 2;
    // The px value of the crossover of the text
    let textCrossover =
      betweenTextWidth - ((100 - rightMid - leftMid) / 100) * barWidth;
    let crossoverRelative;
    // If the text is crossing over, then adjust the position
    if (textCrossover > 0) {
      crossoverRelative = (100 * (textCrossover + adjustment)) / barWidth;
      // The distance to shift the text so that it doesn't overflow
      minTextPos -= crossoverRelative / 2;
      maxTextPos -= crossoverRelative / 2;
    }

    // Check if text is overflowing off either edge of the bar

    // Calculate px of overflow
    const overflowLeft = minTextWidth / 2 - (minTextPos / 100) * barWidth;
    const overflowRight = maxTextWidth / 2 - (maxTextPos / 100) * barWidth;

    // If the text is overflowing, return the adjusted mid point

    let handleAtEnd;
    if (overflowLeft > 0) {
      // Set the position to the extreme left end
      minTextPos = (100 * (minTextWidth / 2 - adjustment)) / barWidth;
      handleAtEnd = 'left';
    }
    if (overflowRight > 0) {
      // Set the position to the extreme right end
      maxTextPos = (100 * (maxTextWidth / 2 - adjustment)) / barWidth;
      handleAtEnd = 'right';
    }

    // Check if stopping the text at the end of the bar caused text crossover
    // The px value of the crossover of the text
    textCrossover =
      ((minTextPos + maxTextPos) / 100) * barWidth +
      (minTextWidth + maxTextWidth) / 2 -
      barWidth;

    if (textCrossover > 0) {
      // Convert px to % of slider bar width
      crossoverRelative = (100 * (textCrossover + adjustment)) / barWidth;

      // Change the position of the text that isn't at end
      if (handleAtEnd === 'left') {
        maxTextPos -= crossoverRelative;
      } else if (handleAtEnd === 'right') {
        minTextPos -= crossoverRelative;
      }
    }
    return { minTextPos, maxTextPos };
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
