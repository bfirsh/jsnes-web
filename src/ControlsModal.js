import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";
import { Controller } from "jsnes";
import ControlMapperRow from "./ControlMapperRow";

class ControlsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { keys: props.keys, button: undefined, modified: false };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.listenForKey = this.listenForKey.bind(this);
  }

  componentWillUnmount() {
    if (this.state.modified) {
      this.props.setKeys(this.state.keys);
    }
    this.removeKeyListener("keydown", this.handleKeyDown);
  }

  listenForKey(button) {
    this.setState({ button });
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    var button = this.state.button;
    var keys = this.state.keys;
    var newKeys = {};
    for (var key in keys) {
      if (keys[key][0] !== button[0] || keys[key][1] !== button[1]) {
        newKeys[key] = keys[key];
      }
    }
    this.setState({
      keys: {
        ...newKeys,
        [event.keyCode]: [
          ...button.slice(0, 2),
          event.key.length > 1 ? event.key : String(event.key).toUpperCase()
        ]
      },
      button: undefined,
      modified: true
    });
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  removeKeyListener() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="ControlsModal"
      >
        <ModalHeader toggle={this.props.toggle}>Controls</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Button</th>
                <th>Player 1</th>
                <th>Player 2</th>
              </tr>
            </thead>
            <tbody>
              <ControlMapperRow
                buttonName="Left"
                button={Controller.BUTTON_LEFT}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="Right"
                button={Controller.BUTTON_RIGHT}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="Up"
                button={Controller.BUTTON_UP}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="Down"
                button={Controller.BUTTON_DOWN}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="A"
                button={Controller.BUTTON_A}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="B"
                button={Controller.BUTTON_B}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="Start"
                button={Controller.BUTTON_START}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
              <ControlMapperRow
                buttonName="Select"
                button={Controller.BUTTON_SELECT}
                keys={this.state.keys}
                handleClick={this.listenForKey}
              />
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.props.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ControlsModal;
