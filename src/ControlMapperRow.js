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
    // Prevent setState being called repeatedly
    if (prevState.waitingForKey !== 0) {
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
        playerTwoButton: playerButtons[1],
        waitingForKey: 0
      });
    }
  }

  handleClick(player) {
    this.props.handleClick([player, this.props.button]);
    this.setState({
      waitingForKey: player
    });
  }

  render() {
    const waitingText = "Press key...";
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
