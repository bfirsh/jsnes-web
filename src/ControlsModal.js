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

class ControlsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { keys: undefined, button: undefined };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(props, state) {
    if (state.keys === undefined && props.keys !== undefined) {
      this.setState({ keys: this.props.keys });
    }
  }

  handleClick(button) {
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
        [event.keyCode]: button
      },
      button: undefined
    });
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  removeKeyListener() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    // Remove key listener in case modal is closed before new button is mapped
    if (!this.props.isOpen) {
      this.removeKeyListener("keydown", this.handleKeyDown);
      this.props.setKeys(this.state.keys);
    }
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
              <tr>
                <td>Left</td>
                <td
                  onClick={() => this.handleClick([1, Controller.BUTTON_LEFT])}
                >
                  Left
                </td>
                <td
                  onClick={() => this.handleClick([2, Controller.BUTTON_LEFT])}
                >
                  Num-4
                </td>
              </tr>
              <tr>
                <td>Right</td>
                <td
                  onClick={() => this.handleClick([1, Controller.BUTTON_RIGHT])}
                >
                  Right
                </td>
                <td
                  onClick={() => this.handleClick([2, Controller.BUTTON_RIGHT])}
                >
                  Num-6
                </td>
              </tr>
              <tr>
                <td>Up</td>
                <td onClick={() => this.handleClick([1, Controller.BUTTON_UP])}>
                  Up
                </td>
                <td onClick={() => this.handleClick([2, Controller.BUTTON_UP])}>
                  Num-8
                </td>
              </tr>
              <tr>
                <td>Down</td>
                <td
                  onClick={() => this.handleClick([1, Controller.BUTTON_DOWN])}
                >
                  Down
                </td>
                <td
                  onClick={() => this.handleClick([2, Controller.BUTTON_DOWN])}
                >
                  Num-2
                </td>
              </tr>
              <tr>
                <td>A</td>
                <td onClick={() => this.handleClick([1, Controller.BUTTON_A])}>
                  X
                </td>
                <td onClick={() => this.handleClick([2, Controller.BUTTON_A])}>
                  Num-7
                </td>
              </tr>
              <tr>
                <td>B</td>
                <td onClick={() => this.handleClick([1, Controller.BUTTON_B])}>
                  Z
                </td>
                <td onClick={() => this.handleClick([2, Controller.BUTTON_B])}>
                  Num-9
                </td>
              </tr>
              <tr>
                <td>Start</td>
                <td
                  onClick={() => this.handleClick([1, Controller.BUTTON_START])}
                >
                  Enter
                </td>
                <td
                  onClick={() => this.handleClick([2, Controller.BUTTON_START])}
                >
                  Num-1
                </td>
              </tr>
              <tr>
                <td>Select</td>
                <td
                  onClick={() =>
                    this.handleClick([1, Controller.BUTTON_SELECT])
                  }
                >
                  Ctrl
                </td>
                <td
                  onClick={() =>
                    this.handleClick([2, Controller.BUTTON_SELECT])
                  }
                >
                  Num-3
                </td>
              </tr>
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
