import Raven from "raven-js";
import React, { Component } from "react";
import { Button, Progress } from "reactstrap";
import { Link } from "react-router-dom";
import "./RunPage.css";
import config from "./config";
import ControlsModal from "./ControlsModal";
import FrameTimer from "./FrameTimer";
import KeyboardController from "./KeyboardController";
import GamepadController from "./GamepadController";
import Screen from "./Screen";
import Speakers from "./Speakers";
import { NES } from "jsnes";

function loadBinary(path, callback, handleProgress) {
  var req = new XMLHttpRequest();
  req.open("GET", path);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.onload = function() {
    if (this.status === 200) {
      callback(null, this.responseText);
    } else if (this.status === 0) {
      // Aborted, so ignore error
    } else {
      callback(new Error(req.statusText));
    }
  };
  req.onerror = function() {
    callback(new Error(req.statusText));
  };
  req.onprogress = handleProgress;
  req.send();
  return req;
}

class RunPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      paused: false,
      controlsModal: false,
      loading: true,
      loadedPercent: 3,
      error: null
    };
  }

  render() {
    return (
      <div className="RunPage">
        <nav
          className="navbar navbar-expand"
          ref={el => {
            this.navbar = el;
          }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">
                &lsaquo; Back
              </Link>
            </li>
          </ul>
          <Button
            outline
            color="primary"
            onClick={this.toggleControlsModal}
            className="mr-3"
          >
            Controls
          </Button>
          <Button
            outline
            color="primary"
            onClick={this.handlePauseResume}
            disabled={!this.state.running}
          >
            {this.state.paused ? "Resume" : "Pause"}
          </Button>
        </nav>

        {this.state.error ? (
          this.state.error
        ) : (
          <div
            className="screen-container"
            ref={el => {
              this.screenContainer = el;
            }}
          >
            {this.state.loading ? (
              <Progress
                value={this.state.loadedPercent}
                style={{
                  position: "absolute",
                  width: "70%",
                  left: "15%",
                  top: "48%"
                }}
              />
            ) : null}
            <Screen
              ref={screen => {
                this.screen = screen;
              }}
              onGenerateFrame={() => {
                this.nes.frame();
              }}
              onMouseDown={(x, y) => {
                // console.log("mouseDown")
                this.nes.zapperMove(x, y);
                this.nes.zapperFireDown();
              }}
              onMouseUp={() => {
                // console.log("mouseUp")
                this.nes.zapperFireUp();
              }}
            />
            {this.state.controlsModal && (
              <ControlsModal
                isOpen={this.state.controlsModal}
                toggle={this.toggleControlsModal}
                keys={this.keyboardController.keys}
                setKeys={this.keyboardController.setKeys}
                promptButton={this.gamepadController.promptButton}
                gamepadConfig={this.gamepadController.gamepadConfig}
                setGamepadConfig={this.gamepadController.setGamepadConfig}
              />
            )}
          </div>
        )}
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
    this.nes = new NES({
      onFrame: this.screen.setBuffer,
      onStatusUpdate: console.log,
      onAudioSample: this.speakers.writeSample
    });

    // For debugging
    window.nes = this.nes;

    this.frameTimer = new FrameTimer({
      onGenerateFrame: Raven.wrap(this.nes.frame),
      onWriteFrame: Raven.wrap(this.screen.writeBuffer)
    });

    this.gamepadController = new GamepadController({
      onButtonDown: this.nes.buttonDown,
      onButtonUp: this.nes.buttonUp
    });

    this.gamepadController.loadGamepadConfig();

    this.gamepadPolling = this.gamepadController.startPolling();

    this.keyboardController = new KeyboardController({
      onButtonDown: this.gamepadController.disableIfGamepadEnabled(
        this.nes.buttonDown
      ),
      onButtonUp: this.gamepadController.disableIfGamepadEnabled(
        this.nes.buttonUp
      )
    });

    // Load keys from localStorage (if they exist)
    this.keyboardController.loadKeys();

    document.addEventListener("keydown", this.keyboardController.handleKeyDown);
    document.addEventListener("keyup", this.keyboardController.handleKeyUp);
    document.addEventListener(
      "keypress",
      this.keyboardController.handleKeyPress
    );

    window.addEventListener("resize", this.layout);
    this.layout();

    this.load();
  }

  componentWillUnmount() {
    if (this.currentRequest) {
      this.currentRequest.abort();
    }
    this.stop();
    document.removeEventListener(
      "keydown",
      this.keyboardController.handleKeyDown
    );
    document.removeEventListener("keyup", this.keyboardController.handleKeyUp);
    document.removeEventListener(
      "keypress",
      this.keyboardController.handleKeyPress
    );

    this.gamepadPolling.stop();

    window.removeEventListener("resize", this.layout);

    window.nes = undefined;
  }

  load = () => {
    if (this.props.match.params.rom) {
      const romName = this.props.match.params.rom;
      const path = config.ROMS[romName];
      if (!path) {
        this.setState({ error: `No such ROM: ${romName}` });
        return;
      }
      this.currentRequest = loadBinary(
        path,
        (err, data) => {
          if (err) {
            window.alert(`Error loading ROM: ${err.toString()}`);
          } else {
            this.handleLoaded(data);
          }
        },
        this.handleProgress
      );
    } else if (this.props.location.state && this.props.location.state.file) {
      let reader = new FileReader();
      reader.readAsBinaryString(this.props.location.state.file);
      reader.onload = e => {
        this.currentRequest = null;
        this.handleLoaded(e.target.result);
      };
    } else {
      window.alert("No ROM provided");
    }
  };

  handleProgress = e => {
    if (e.lengthComputable) {
      this.setState({ loadedPercent: (e.loaded / e.total) * 100 });
    }
  };

  handleLoaded = data => {
    this.setState({ uiEnabled: true, running: true, loading: false });
    this.nes.loadROM(data);
    this.start();
  };

  start = () => {
    this.frameTimer.start();
    this.speakers.start();
    this.fpsInterval = setInterval(() => {
      console.log(`FPS: ${this.nes.getFPS()}`);
    }, 1000);
  };

  stop = () => {
    this.frameTimer.stop();
    this.speakers.stop();
    clearInterval(this.fpsInterval);
  };

  handlePauseResume = () => {
    if (this.state.paused) {
      this.setState({ paused: false });
      this.start();
    } else {
      this.setState({ paused: true });
      this.stop();
    }
  };

  layout = () => {
    let navbarHeight = parseFloat(window.getComputedStyle(this.navbar).height);
    this.screenContainer.style.height = `${window.innerHeight -
      navbarHeight}px`;
    this.screen.fitInParent();
  };

  toggleControlsModal = () => {
    this.setState({ controlsModal: !this.state.controlsModal });
  };
}

export default RunPage;
