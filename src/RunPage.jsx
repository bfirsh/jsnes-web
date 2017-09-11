import React, { Component } from "react";
import { Container } from "reactstrap";
import "./RunPage.css";
import config from "./config";
import Controls from "./Controls";
import FrameTimer from "./FrameTimer";
import Screen from "./Screen";
import Speakers from "./Speakers";
import { NES } from "jsnes";

function loadBinary(path, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", path);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.onload = function() {
    if (this.status === 200) {
      callback(null, this.responseText);
    } else {
      callback(new Error(req.statusText));
    }
  };
  req.onerror = function() {
    callback(new Error(req.statusText));
  };
  req.send();
}

class RunPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      paused: false,
      status: "Booting..."
    };
  }

  render() {
    return (
      <Container className="RunPage">
        <Screen
          ref={screen => {
            this.screen = screen;
          }}
          onGenerateFrame={() => {
            this.nes.frame();
          }}
        />

        {this.state.running && (
          <Controls
            paused={this.state.paused}
            onPauseResume={this.handlePauseResume}
            onRestart={this.handleRestart}
          />
        )}
        <p>{this.state.status}</p>
      </Container>
    );
  }

  componentDidMount() {
    this.speakers = new Speakers({
      onBufferUnderrun: (actualSize, desiredSize) => {
        if (!this.state.running || this.state.paused) {
          return;
        }
        // Skip a video frame so audio remains consistent. This happens for
        // a variety of reasons:
        // - Frame rate is not quite 60fps, so sometimes buffer empties
        // - Page is not visible, so requestAnimationFrame doesn't get fired.
        //   In this case emulator still runs at full speed, but timing is
        //   done by audio instead of requestAnimationFrame.
        // - System can't run emulator at full speed. In this case it'll stop
        //    firing requestAnimationFrame.
        console.log(
          "Buffer underrun, running another frame to try and catch up"
        );
        this.nes.frame();
        // desiredSize will be 2048, and the NES produces 1468 samples on each
        // frame so we might need a second frame to be run. Give up after that
        // though -- the system is not catching up
        if (this.speakers.buffer.size() < desiredSize) {
          console.log("Still buffer underrun, running a second frame");
          this.nes.frame();
        }
      }
    });
    this.speakers.start();
    this.nes = new NES({
      onFrame: this.screen.setBuffer,
      onStatusUpdate: this.setStatus,
      onAudioSample: this.speakers.writeSample
    });

    this.frameTimer = new FrameTimer({
      onGenerateFrame: this.nes.frame,
      onWriteFrame: this.screen.writeBuffer
    });

    document.addEventListener("keydown", e => this.nes.keyboard.keyDown(e));
    document.addEventListener("keyup", e => this.nes.keyboard.keyUp(e));
    document.addEventListener("keypress", e => this.nes.keyboard.keyPress(e));

    this.load();
  }

  load = () => {
    const path = config.BASE_ROM_URL + this.props.match.params.rom;
    loadBinary(path, (err, data) => {
      if (err) {
        this.setStatus(`Error loading ROM: ${err.toString()}`)
      } else {
        this.handleLoaded(data);
      }
    });
  };

  handleLoaded = data => {
    this.setStatus("Loaded.");
    this.setState({ uiEnabled: true, running: true });
    this.nes.loadROM(data);
    this.start();
  };

  start = () => {
    this.frameTimer.start();
    setInterval(() => {
      console.log(`FPS: ${this.nes.getFPS()}`);
    }, 1000);
  };

  stop = () => {
    this.frameTimer.stop();
  };

  setStatus = msg => {
    this.setState({ status: msg });
  };

  handlePauseResume = () => {
    if (this.state.paused) {
      this.setState({ paused: false });
      this.setStatus("Running");
      this.start();
    } else {
      this.setState({ paused: true });
      this.setStatus("Paused");
      this.stop();
    }
  };

  handleRestart = () => {
    this.nes.reloadROM();
  };
}

export default RunPage;
