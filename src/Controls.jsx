import React, { Component } from "react";

class Controls extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onPauseResume}>
          {this.props.paused ? "resume" : "pause"}
        </button>
        <button onClick={this.props.onRestart}>restart</button>
      </div>
    );
  }
}

export default Controls;
