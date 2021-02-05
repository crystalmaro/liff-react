import React from "react";
import "../css/style.css";

// Code ported to react from https://edwardize.blogspot.com/2018/11/canvas-scratch-cards-vuejs.html

const HEIGHT = 480;
const WIDTH = 640;

export default class Scratchcard2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawing: false,
      startX: 0,
      startY: 0
    };
    this.canvasRef = React.createRef();
  }

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
      <canvas
        ref={this.canvasRef}
        id="canvas"
        width={`${WIDTH}px`}
        height={`${HEIGHT}px`}
      />
    );
  }
}
