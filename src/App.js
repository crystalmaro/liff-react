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

// const noop = o => o;
export default class ScratchOff extends Component {
  state = {
    isDrawing: false,
    lastPoint: null
  }

  componentDidMount() {
    const canvas = this.canvas;
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    canvas.addEventListener('mousedown', this.touchStart);
    canvas.addEventListener('touchstart', this.touchStart);
    canvas.addEventListener('mousemove', this.touchMove);
    canvas.addEventListener('touchmove', this.touchMove);
    canvas.addEventListener('mouseup', this.touchEnd);
    canvas.addEventListener('touchend', this.touchEnd);
    
    this.ctx = canvas.getContext('2d');
    // this.ctx.crossOrigin = "Anonymous";

    this.brush = new Image();
    this.brush.src = "https://i.ibb.co/wczc04k/scratch-brush.png"
    // this.brush.src = "https://i.ibb.co/jvJwwSL/rsz-scratch-brush.png"
    this.brush.crossOrigin = "Anonymous";

    this.cover = new Image();
    this.cover.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJUfpqnOLlKhnWKJF7RiuFniQeCdwfnu6ZEg&usqp=CAU"
    this.cover.onload = () => this.ctx.drawImage(this.cover, 0, 0, canvas.width, canvas.height);
    this.cover.crossOrigin = "Anonymous";
  };

   componentWillUnmount() {
    const canvas = this.canvas;
    canvas.removeEventListener('mousedown', this.touchStart);
    canvas.removeEventListener('touchstart', this.touchStart);
    canvas.removeEventListener('mousemove', this.touchMove);
    canvas.removeEventListener('touchmove', this.touchMove);
    canvas.removeEventListener('mouseup', this.touchEnd);
    canvas.removeEventListener('touchend', this.touchEnd);
  }

  checkFilledPercent = () => {
    //  use getImageData and check the total number of pixels that is transparent
    // this.ctx = canvas.getContext('2d');
    const data = this.ctx.getImageData(0, 0, this.canvas.parentElement.offsetWidth, this.canvas.parentElement.offsetHeight).data;
    const nrOfPixels = data.length / 4; // rgba pixels
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      transparent += data[i] ? 0 : 1;
    }
    const percentage = transparent / nrOfPixels * 100;
    if (percentage > 20) {
      console.log(percentage)
      alert('scratched over 20%')
    }
  }

  getPosition = (event) => {
    let target = this.canvas;
    let offsetX = 0;
    let offsetY = 0;
    
    if (target.offsetParent !== undefined) {
      while (target = target.offsetParent) {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
      }
    }

    const x = (event.pageX || event.touches[0].clientX) - offsetX;
    const y = (event.pageY || event.touches[0].clientY) - offsetY;
    return {x, y};
  }

  touchStart = (event) => {
    this.isDrawing = true;
    this.lastPoint = this.getPosition(event);
    this.ctx.globalCompositeOperation = 'destination-out';
  }

  touchMove = (event) => {
    if (!this.isDrawing) return;
    event.preventDefault();

    const ctx = this.ctx;    
    const a = this.lastPoint;
    const b = this.getPosition(event);
    const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const angle = Math.atan2(b.x - a.x, b.y - a.y);
    const offsetX = this.brush.width / 2;
    const offsetY = this.brush.height / 2;
    
    for (let x, y, i = 0; i < dist; i++) {
      x = a.x + (Math.sin(angle) * i) - offsetX;
      y = a.y + (Math.cos(angle) * i) - offsetY;
      ctx.drawImage(this.brush, x, y);
    }

    this.lastPoint = b;
  }

  touchEnd = (event) => {
    this.isDrawing = false;
    this.checkFilledPercent();
  }

  render() {
    return (
      <div style={{position:'relative',width:300,height:300,border:'1px solid red'}}>
        <canvas 
          style={{position:'absolute',zIndex:2,width:'100%',height:'100%'}}
          ref={el => this.canvas = el} />
        <div className="secret absolute fill no-select flex justify-center items-center">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const prizeImg = 'https://community.canvaslms.com/t5/image/serverpage/avatar-name/panda4/avatar-theme/candy/avatar-collection/Pandas/avatar-display-size/message/version/2?xdesc=1.0' 
// const secret = Math.random().toString(16).slice(2, 7).toUpperCase();

function App() {
  return (
    <div className="App">
      <ScratchOff>
        <img 
        src={prizeImg} />
      </ScratchOff>
      <hr />
      <GetLineProfile />
      <hr />
      <ShareLineButton />      
    </div>
  );
}

export default App;