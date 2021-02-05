import React, { Component, createRef } from 'react';
import "./css/style.css";
import { SearchBook } from "./component/SearchBook";
import { GetLineProfile } from "./component/GetLineProfile";
import { ShareLineButton } from "./component/ShareLineButton";
import { DrawHooks } from "./component/DrawHooks";
import { ScratchcardHook } from "./component/ScratchcardHook";
import { ScratchcardClass } from "./component/ScratchcardClass";

const HEIGHT = 240;
const WIDTH = 320;

export default class Scratchcard2 extends Component {
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

    context.fillStyle = "blue";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.lineWidth = 15;
    context.lineJoin = "round";

    // this.cover = new Image();
    // this.cover.src = "http://images.performgroup.com/di/library/sporting_news/9a/a1/stephen-curry-ftr-getty-imagesjpg_1w96fue8l2ti4191ele662qkh5.jpg?t=-710915087&w=960&quality=70"
    // this.cover.onload = () => this.context.drawImage(this.cover, 0, 0, WIDTH, HEIGHT);
  
  };

  componentWillUnmount = () => {
    canvas.removeEventListener("mousedown", this.scratchStart);
    canvas.removeEventListener("mousemove", this.scratch);
    canvas.removeEventListener("mouseup", this.scratchEnd);

    canvas.removeEventListener("touchstart", this.scratchStart);
    canvas.removeEventListener("touchmove", this.scratch);
    canvas.removeEventListener("touchend", this.scratchEnd);
  }

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
    this.setState({isDrawing: false});
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

// <ScratchcardClass />

function App() {
  return (
    <div className="App">
      
      <hr />
      <Scratchcard2 />
      <hr />
      <ScratchcardHook />
      <hr />
      <GetLineProfile />
      <hr />
      <ShareLineButton />
      <hr />
      <DrawHooks />
      <hr />
      <SearchBook />
    </div>
  );
}

export default App;
