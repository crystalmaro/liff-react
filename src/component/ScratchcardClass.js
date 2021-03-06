import React, { Component, createRef } from "react";

const HEIGHT = 480;
const WIDTH = 640;

class ScratchcardClass extends Component {
  state = {
    isDrawing: false,
    startX: 0,
    startY: 0
  };
  canvasRef = createRef();

  componentDidMount = () => {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", this.scratchStart);
    canvas.addEventListener("mousemove", this.scratch);
    canvas.addEventListener("mouseup", this.scratchEnd);

    canvas.addEventListener("touchstart", this.scratchStart);
    canvas.addEventListener("touchmove", this.scratch);
    canvas.addEventListener("touchend", this.scratchEnd);

    context.fillStyle = "pink";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.lineWidth = 15;
    context.lineJoin = "round";
  };

  componentWillUnmount = () => {
    canvas.removeEventListener("mousedown", this.scratchStart);
    canvas.removeEventListener("mousemove", this.scratch);
    canvas.removeEventListener("mouseup", this.scratchEnd);

    canvas.removeEventListener("touchstart", this.scratchStart);
    canvas.removeEventListener("touchmove", this.scratch);
    canvas.removeEventListener("touchend", this.scratchEnd);
  };

  scratchStart = e => {
    const { layerX, layerY } = e;

    this.setState({
      isDrawing: true,
      startX: layerX,
      startY: layerY
    });
  };

  scratch = e => {
    const { layerX, layerY } = e;
    const context = this.canvasRef.current.getContext("2d");

    if (!this.state.isDrawing) return;

    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.moveTo(this.state.startX, this.state.startY);
    context.lineTo(layerX, layerY);
    context.closePath();
    context.stroke();

    this.setState({
      startX: layerX,
      startY: layerY
    });
  };

  scratchEnd = e => {
    this.setState({ isDrawing: false });
  };

  render() {
    return (
      <div className="scratch-card__wrapper">
        <canvas
          ref={this.canvasRef}
          id="canvas"
          className="scratch-card__canvas"
          width={`${WIDTH}px`}
          height={`${HEIGHT}px`}
        />
      </div>
    );
  }
}

export default ScratchcardClass;
