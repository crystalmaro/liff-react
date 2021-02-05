import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";

const HEIGHT = 240;
const WIDTH = 320;

export function ScratchcardHook() {
  const [isDrawing, setDrawingState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const canvasRef = useRef();
  const [locations, setLocations] = useState([]);

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // canvas.width = canvas.parentElement.offsetWidth;
    // canvas.height = canvas.parentElement.offsetHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    canvas.addEventListener("mousedown", scratchStart);
    canvas.addEventListener("touchstart", scratchStart);
    canvas.addEventListener("mousemove", scratchMove);
    canvas.addEventListener("touchmove", scratchMove);
    canvas.addEventListener("mouseup", scratchEnd);
    canvas.addEventListener("touchend", scratchEnd);

    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 15;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    return () => {
      canvas.removeEventListener("mousedown", scratchStart);
      canvas.removeEventListener("touchstart", scratchStart);
      canvas.removeEventListener("mousemove", scratchMove);
      canvas.removeEventListener("touchmove", scratchMove);
      canvas.removeEventListener("mouseup", scratchEnd);
      canvas.removeEventListener("touchend", scratchEnd);
    };
  });

  // -> mousedown
  const scratchStart = e => {
    // const { layerX, layerY } = e;
    // setDrawingState(true);
    // setStartX(layerX);
    // setStartY(layerY);

    setDrawingState(true);
    setLastX(e.offsetX);
    setLastY(e.offsetY);
  };

  // -> mousemove (draw)
  const scratchMove = e => {
    // const { layerX, layerY } = e;
    // const ctx = canvasRef.current.getContext("2d");
    // if (!isDrawing) return;
    // setStartX(layerX);
    // setStartY(layerY);

    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.beginPath(); // starting point
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY); // go to
    ctx.stroke();
    setLastX(e.offsetX);
    setLastY(e.offsetY);
  };

  // -> mouseup
  const scratchEnd = e => {
    setDrawingState(false);
  };

  return (
    <>
      <h3>ScratchcardHook.js</h3>
      <div className="scratch-card__wrapper">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      </div>
    </>
  );
}
