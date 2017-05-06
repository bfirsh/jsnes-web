import React, { Component } from "react";
import "./App.css";
import Controls from "./Controls";
import FrameTimer from "./FrameTimer";
import Load from "./Load";
import Screen from "./Screen";
import Speakers from "./Speakers";
import { NES } from "jsnes";

class App extends Component {
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
      <div className="App">
        <Load
          roms={{
            "roms/croom/croom.nes": "Concentration Room",
            "roms/lj65/lj65.nes": "LJ65",
            "roms/local/Super Mario Bros. (JU) (PRG0) [!].nes": "Super Mario Bros"
          }}
          onLoading={path => this.setStatus(`Loading ${path}...`)}
          onLoaded={this.handleLoaded}
          onError={msg => this.setStatus(`Error loading ROM: ${msg}`)}
        />

        <Screen
          ref={screen => {
            this.screen = screen;
          }}
          onGenerateFrame={() => {
            this.nes.frame();
          }}
        />

        {this.state.running &&
          <Controls
            paused={this.state.paused}
            onPauseResume={this.handlePauseResume}
            onRestart={this.handleRestart}
          />}
        <p>{this.state.status}</p>
      </div>
    );
  }

  componentDidMount() {
    this.speakers = new Speakers();
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
  }

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

export default App;
