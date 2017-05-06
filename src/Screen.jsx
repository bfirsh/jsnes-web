import React, { Component } from "react";
import "./Screen.css";

class Screen extends Component {
  constructor(props) {
    super(props);

    // buffer to write on next animation frame
    this.buffer = null;

    // buffer written in previous animation frame
    this.prevBuffer = new Array(256 * 240);
  }

  render() {
    return (
      <canvas
        className="Screen"
        width="256"
        height="240"
        ref={canvas => {
          this.canvas = canvas;
        }}
      />
    );
  }

  componentDidMount() {
    this.initCanvas();
  }

  initCanvas() {
    // scale with CSS
    this.canvas.style.width = `${256 * 2}px`;
    this.canvas.style.height = `${240 * 2}px`;

    this.context = this.canvas.getContext("2d");
    this.imageData = this.context.getImageData(0, 0, 256, 240);

    this.context.fillStyle = "black";
    // set alpha to opaque
    this.context.fillRect(0, 0, 256, 240);

    // Set alpha
    for (var i = 3; i < this.imageData.data.length - 3; i += 4) {
      this.imageData.data[i] = 0xff;
    }
  }

  setBuffer = buffer => {
    this.buffer = buffer;
  };

  writeBuffer = () => {
    if (this.buffer === null) return;

    var imageData = this.imageData.data;
    var pixel, i, j;

    for (i = 0; i < 256 * 240; i++) {
      pixel = this.buffer[i];

      if (pixel !== this.prevBuffer[i]) {
        j = i * 4;
        imageData[j] = pixel & 0xff;
        imageData[j + 1] = (pixel >> 8) & 0xff;
        imageData[j + 2] = (pixel >> 16) & 0xff;
        this.prevBuffer[i] = pixel;
      }
    }

    this.context.putImageData(this.imageData, 0, 0);
  };

  screenshot() {
    var img = new Image();
    img.src = this.canvas.toDataURL("image/png");
    return img;
  }
}

export default Screen;
