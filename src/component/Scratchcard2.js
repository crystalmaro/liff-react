import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";

// const noop = o => o;

export function Scratchcard2() {
  const canvasRef = useRef(null);
  const [isDrawing, setDrawingState] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  let cover = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    canvas.addEventListener('mousedown', touchStart);
    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('mousemove', touchMove);
    canvas.addEventListener('touchmove', touchMove);
    canvas.addEventListener('mouseup', touchEnd);
    canvas.addEventListener('touchend', touchEnd);

    const ctx = canvas.getContext("2d");

    cover = new Image();
    cover.src = 


  })

  const touchStart = e => {}
  const touchMove = e => {}
  const touchEnd = e => {}

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
