import React, { Component } from "react";
import Select from "./Select";

function loadBinary(path, onLoaded, onError) {
  var req = new XMLHttpRequest();
  req.open("GET", path);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.onload = function() {
    if (this.status === 200) {
      onLoaded(this.responseText);
    } else {
      onError(req.statusText);
    }
  };
  req.onerror = function() {
    onError(req.statusText);
  };
  req.send();
}

class Load extends Component {
  render() {
    return (
      <div className="Load">
        <Select
          options={this.props.roms}
          placeholder="Select a ROM"
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange = path => {
    this.props.onLoading(path);
    loadBinary(path, this.props.onLoaded, this.props.onError);
  };
}

export default Load;
