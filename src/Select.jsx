import React, { Component } from "react";
import { Input } from "reactstrap";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <Input type="select" value={this.state.value} onChange={this.handleChange}>
        <option value="">{this.props.placeholder}</option>
        {Object.keys(this.props.options).map(key =>
          <option key={key} value={key}>{this.props.options[key]}</option>
        )}
      </Input>
    );
  }
}

export default Select;
