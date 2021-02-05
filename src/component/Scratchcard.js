import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";

export function Scratchcard() {
  const canvasRef = useRef(null);
  const [isDrawing, setDrawingState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", scratchStart);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", scratchEnd);

    canvas.addEventListener("touchstart", scratchStart);
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("touchend", scratchEnd);

    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight / 2);
    ctx.lineWidth = 15;
    ctx.lineJoin = "round";
  });

  const scratchStart = e => {
    const { layerX, layerY } = e;
    setDrawingState(true);
    setStartX(layerX);
    setStartY(layerY);
  };

  const scratch = e => {
    const { layerX, layerY } = e;
    const ctx = canvasRef.current.getContext("2d");
    if (!isDrawing) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(layerX, layerY);
    ctx.closePath();
    ctx.stroke();

    setStartX(layerX);
    setStartY(layerY);
  };

  const scratchEnd = e => {
    setDrawingState(false);
  };

  return (
    <>
      <div className="scratch-card__wrapper">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight / 2}
        />
      </div>
    </>
  );
}
