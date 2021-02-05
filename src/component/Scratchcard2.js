import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";

// const noop = o => o;

export function Scratchcard2() {
  const canvasRef = useRef(null);
  const [isDrawing, setDrawingState] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    const cover = null;

    canvas.addEventListener("mousedown", touchStart);
    canvas.addEventListener("touchstart", touchStart);
    canvas.addEventListener("mousemove", touchMove);
    canvas.addEventListener("touchmove", touchMove);
    canvas.addEventListener("mouseup", touchEnd);
    canvas.addEventListener("touchend", touchEnd);

    const ctx = canvas.getContext("2d");

    // cover = new Image();
    // cover.src = require('../images/scratch-cover.png');
    // cover.onload = () => ctx.drawImage(cover, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => {
      // const canvas = canvasRef.current;
      canvas.removeEventListener('mousedown', touchStart);
      canvas.removeEventListener('touchstart', touchStart);
      canvas.removeEventListener('mousemove', touchMove);
      canvas.removeEventListener('touchmove', touchMove);
      canvas.removeEventListener('mouseup', touchEnd);
      canvas.removeEventListener('touchend', touchEnd);
    }
  });

  const getPosition = e => {
    const canvas = canvasRef.current;
    // let offsetX = 0
    let { offsetX, offsetY} = 0
    if (target.offsetParent !== undefined) {
      while (target = target.offsetParent) {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
      }
    }

    const x = (e.pageX || e.touches[0].clientX) - offsetX;
    const y = (e.pageY || e.touches[0].clientY) - offsetY;
    return {x, y};
  }

  const touchStart = e => {
    const ctx = canvasRef.current.getContext("2d");
    setDrawingState(true);
    setLastPoint(getPosition(e));
    ctx.globalCompositeOperation = 'destination-out';
  };

  const touchMove = e => {
    if (!isDrawing) return;
    e.preventDefault();

    const ctx = canvasRef.current.getContext("2d");
    const a = lastPoint;
    const b = getPosition(e);
    const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const angle = Math.atan2(b.x - a.x, b.y - a.y);
    const offsetX = this.brush.width / 2;
    const offsetY = this.brush.height / 2;
    
    for (let x, y, i = 0; i < dist; i++) {
      x = a.x + (Math.sin(angle) * i) - offsetX;
      y = a.y + (Math.cos(angle) * i) - offsetY;
      ctx.drawImage(this.brush, x, y);
    }



  };

  const touchEnd = e => {};

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
