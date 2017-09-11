import React, { Component } from "react";
import { Container } from "reactstrap";
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
        <Container>
          <Screen
            ref={screen => {
              this.screen = screen;
            }}
            onGenerateFrame={() => {
              this.nes.frame();
            }}
          />

          <Load
            roms={{
              "https://d3cto2l652k3y0.cloudfront.net/Bubble Bobble (U).nes":
                "Bubble Bobble",
              "roms/croom/croom.nes": "Concentration Room",
              "https://d3cto2l652k3y0.cloudfront.net/Contra (U) [!].nes":
                "Contra",
              "https://d3cto2l652k3y0.cloudfront.net/Donkey Kong (JU).nes":
                "Donkey Kong",
              "https://d3cto2l652k3y0.cloudfront.net/Dr. Mario (JU).nes":
                "Dr. Mario",
              "https://d3cto2l652k3y0.cloudfront.net/Golf (JU).nes": "Golf",
              "https://d3cto2l652k3y0.cloudfront.net/Legend of Zelda, The (U) (PRG1).nes":
                "The Legend of Zelda",
              "https://d3cto2l652k3y0.cloudfront.net/Lemmings (U).nes":
                "Lemmings",
              "https://d3cto2l652k3y0.cloudfront.net/Lifeforce (U).nes":
                "Lifeforce",
              "roms/lj65/lj65.nes": "LJ65",
              "https://d3cto2l652k3y0.cloudfront.net/Mario Bros. (JU) [!].nes":
                "Mario Bros.",
              "https://d3cto2l652k3y0.cloudfront.net/Mega Man (U).nes":
                "Mega Man",
              "https://d3cto2l652k3y0.cloudfront.net/Pac-Man (U) [!].nes":
                "Pac-Man",
              "https://d3cto2l652k3y0.cloudfront.net/Super Mario Bros. (JU) (PRG0) [!].nes":
                "Super Mario Bros.",
              "https://d3cto2l652k3y0.cloudfront.net/Super Mario Bros. 3 (U) (PRG1) [!].nes":
                "Super Mario Bros. 3",
              "https://d3cto2l652k3y0.cloudfront.net/Tennis (JU) [!].nes":
                "Tennis",
              "https://d3cto2l652k3y0.cloudfront.net/Tetris (U) [!].nes":
                "Tetris",
              "https://d3cto2l652k3y0.cloudfront.net/Tetris 2 (U) [!].nes":
                "Tetris 2",
              "https://d3cto2l652k3y0.cloudfront.net/Zelda II - The Adventure of Link (U).nes":
                "Zelda II - The Adventure of Link"
            }}
            onLoading={path => this.setStatus(`Loading ${path}...`)}
            onLoaded={this.handleLoaded}
            onError={msg => this.setStatus(`Error loading ROM: ${msg}`)}
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
      </div>
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
        console.log("Buffer underrun, running another frame to try and catch up");
        this.nes.frame();
        // desiredSize will be 2048, and the NES produces 1468 samples on each
        // frame so we might need a second frame to be run. Give up after that
        // though -- the system is not catching up
        if (this.speakers.buffer.size() < desiredSize) {
          console.log("Still buffer underrun, running a second frame")
          this.nes.frame();
        }
      },
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
