import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";

class ControlsModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        altControls={this.props.altControls}
        ischecked={this.props.ischecked}
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
                <td>A</td>
                <td>Left</td>
              </tr>
              <tr>
                <td>Right</td>
                <td>D</td>
                <td>Right</td>
              </tr>
              <tr>
                <td>Up</td>
                <td>W</td>
                <td>Up</td>
              </tr>
              <tr>
                <td>Down</td>
                <td>S</td>
                <td>Down</td>
              </tr>
              <tr>
                <td>A</td>
                <td>F</td>
                <td>;</td>
              </tr>
              <tr>
                <td>B</td>
                <td>G</td>
                <td>'</td>
              </tr>
              <tr>
                <td>Start</td>
                <td>Enter</td>
                <td>.</td>
              </tr>
              <tr>
                <td>Select</td>
                <td>CTRL</td>
                <td>/</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.props.toggle}>
            Close
          </Button>
          <label>
            Whould you like to use the alternate controls?
            <input
              type="checkbox"
              onClick={this.props.altControls}
              checked={this.props.ischecked}
            />
          </label>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ControlsModal;
