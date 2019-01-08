import React, { Component } from "react";

class ControlMapperRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneButton: "",
      playerTwoButton: "",
      waitingForKey: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    var keys = this.props.keys;
    var button = this.props.button;
    var playerButtons = [];
    for (var key in keys) {
      if (keys[key][0] === 1 && keys[key][1] === button) {
        playerButtons[0] = keys[key][2];
        console.log(playerButtons[0]);
      } else if (keys[key][0] === 2 && keys[key][1] === button) {
        playerButtons[1] = keys[key][2];
      }
    }
    this.setState({
      playerOneButton: playerButtons[0],
      playerTwoButton: playerButtons[1]
    });
  }

  componentDidUpdate(prevProps, prevState) {
    var keys = this.props.keys;
    var button = this.props.button;
    var playerButtons = [];
    var gamepadButton;
    var newButton;

    for (var key in keys) {
      if (keys[key][0] === 1 && keys[key][1] === button) {
        playerButtons[0] = keys[key][2];
        console.log(playerButtons[0]);
      } else if (keys[key][0] === 2 && keys[key][1] === button) {
        playerButtons[1] = keys[key][2];
      }
    }

    var searchButton = (gamepadConfig, buttonId) => {
      return gamepadConfig.buttons.filter(b => b.buttonId === buttonId)[0];
    };

    var searchNewButton = (prevGamepadConfig, gamepadConfig) => {
      return gamepadConfig.buttons.filter(b => {
        return (
          !prevGamepadConfig ||
          !prevGamepadConfig.buttons.some(b2 => b2.buttonId === b.buttonId)
        );
      })[0];
    };

    var waitingForKey = 0;
    var waitingForKeyPlayer = 0;

    var gamepadButtonName = gamepadButton => {
      if (gamepadButton.type === "button") return "Btn-" + gamepadButton.code;
      if (gamepadButton.type === "axis")
        return "Axis-" + gamepadButton.code + " " + gamepadButton.value;
    };

    if (this.props.gamepadConfig && this.props.gamepadConfig.playerGamepadId) {
      const playerGamepadId = this.props.gamepadConfig.playerGamepadId;
      if (playerGamepadId[0]) {
        playerButtons[0] = "";
        gamepadButton = searchButton(
          this.props.gamepadConfig.configs[playerGamepadId[0]],
          button
        );
        newButton = searchNewButton(
          prevProps.gamepadConfig.configs[playerGamepadId[0]],
          this.props.gamepadConfig.configs[playerGamepadId[0]]
        );
        if (gamepadButton) {
          playerButtons[0] = gamepadButtonName(gamepadButton);
        } else {
          if (newButton && newButton.buttonId === this.props.prevButton) {
            if (!waitingForKey) {
              waitingForKey = 1;
              waitingForKeyPlayer = 1;
            }
          }
        }
      }

      if (playerGamepadId[1]) {
        playerButtons[1] = "";
        gamepadButton = searchButton(
          this.props.gamepadConfig.configs[playerGamepadId[1]],
          button
        );
        newButton = searchNewButton(
          prevProps.gamepadConfig.configs[playerGamepadId[1]],
          this.props.gamepadConfig.configs[playerGamepadId[1]]
        );
        if (gamepadButton) {
          playerButtons[1] = gamepadButtonName(gamepadButton);
        } else {
          if (newButton && newButton.buttonId === this.props.prevButton) {
            if (!waitingForKey) {
              waitingForKey = 2;
              waitingForKeyPlayer = 2;
            }
          }
        }
      }
    }

    var newState = {};

    if (waitingForKey) {
      this.props.handleClick([waitingForKeyPlayer, this.props.button]);
    }
    // Prevent setState being called repeatedly
    if (
      prevState.playerOneButton !== playerButtons[0] ||
      prevState.playerTwoButton !== playerButtons[1]
    ) {
      newState.playerOneButton = playerButtons[0];
      newState.playerTwoButton = playerButtons[1];
    }

    if (waitingForKey) {
      newState.waitingForKey = waitingForKey;
    } else if (prevState.waitingForKey === 1) {
      if (this.props.currentPromptButton !== this.props.button) {
        newState.waitingForKey = 0;
      }
    } else if (prevState.waitingForKey === 2) {
      if (this.props.currentPromptButton !== this.props.button) {
        newState.waitingForKey = 0;
      }
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState);
    }
  }

  handleClick(player) {
    this.props.handleClick([player, this.props.button]);
    this.setState({
      waitingForKey: player
    });
  }

  render() {
    const waitingText = "Press key or button...";
    return (
      <tr>
        <td>{this.props.buttonName}</td>
        <td onClick={() => this.handleClick(1)}>
          {this.state.waitingForKey === 1
            ? waitingText
            : this.state.playerOneButton}
        </td>
        <td onClick={() => this.handleClick(2)}>
          {this.state.waitingForKey === 2
            ? waitingText
            : this.state.playerTwoButton}
        </td>
      </tr>
    );
  }
}

export default ControlMapperRow;
