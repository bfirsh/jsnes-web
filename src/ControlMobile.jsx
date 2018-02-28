import React, { Component } from "react";
import {
  Button,
} from "reactstrap";
import { Controller } from "jsnes";

export default class ControlMobile extends Component {
  handleKeyDown = (p_button) => {
    this.props.onButtonDown(1, p_button);
  };

  handleKeyUp = (p_button) => {
    this.props.onButtonUp(1, p_button);
  };

  render() {
    return (
      <div>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_A)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_A)} color="secondary" size="lg">A</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_B)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_B)} color="secondary" size="lg">B</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_UP)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_UP)} color="secondary" size="lg">UP</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_DOWN)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_DOWN)} color="secondary" size="lg">DOWN</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_LEFT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_LEFT)} color="secondary" size="lg">LEFT</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_RIGHT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_RIGHT)} color="secondary" size="lg">RIGHT</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_SELECT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_SELECT)} color="secondary" size="lg">SELECT</Button>
        <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_START)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_START)} color="secondary" size="lg">START</Button>
      </div>
    );
  }
}