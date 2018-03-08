import React, { Component } from "react";
import {
  Button,
} from "reactstrap";
import { Controller } from "jsnes";
import "./ControlMobile.css";

export default class ControlMobile extends Component {
  handleKeyDown = (p_button) => {
    this.props.onButtonDown(1, p_button);
  };

  handleKeyUp = (p_button) => {
    this.props.onButtonUp(1, p_button);
  };

  render() {
    return (


      // <div>
      //   <Button  color="secondary" size="lg">A</Button>
      //   <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_B)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_B)} color="secondary" size="lg">B</Button>
      //   <div classNameName="pad">
      //     <Button classNameName="up" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_UP)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_UP)} color="secondary" size="lg"></Button>
      //     <Button classNameName="down" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_DOWN)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_DOWN)} color="secondary" size="lg"></Button>
      //     <Button classNameName="left" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_LEFT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_LEFT)} color="secondary" size="lg"></Button>
      //     <Button classNameName="right" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_RIGHT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_RIGHT)} color="secondary" size="lg"></Button>
      //   </div>
      //   <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_SELECT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_SELECT)} color="secondary" size="lg">SELECT</Button>

      //   <Button onTouchStart={() => this.handleKeyDown(Controller.BUTTON_START)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_START)} color="secondary" size="lg">START</Button>
      // </div>

      <div className="gbasp">

        <div className="controller">
          <div className="inner">
            <div className="controlpad">
              <div className="outer">
                <div className="dpad_outer">
                  <div className="dpad_mask">
                    <div className="dpad_corner tl"></div>

                    {/* <!-- D-Pad Up --> */}
                    <div className="dpad_bt up" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_UP)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_UP)}></div>

                    <div className="dpad_corner tr"></div>

                    {/* <!-- D-Pad Left --> */}
                    <div className="dpad_bt left" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_LEFT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_LEFT)}></div>

                    <div className="dpad_inner"></div>

                    {/* <!-- D-Pad Right --> */}
                    <div className="dpad_bt right" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_RIGHT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_RIGHT)}></div>

                    <div className="dpad_corner bl"></div>

                    {/* <!-- D-Pad Down --> */}
                    <div className="dpad_bt down" onTouchStart={() => this.handleKeyDown(Controller.BUTTON_DOWN)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_DOWN)}></div>

                    <div className="dpad_corner br"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="startstop">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li className="buttons">
                  <ul>
                    <li>
                      {/* <!-- Select Button --> */}
                      <div onTouchStart={() => this.handleKeyDown(Controller.BUTTON_SELECT)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_SELECT)}></div>

                    </li>
                    <li>
                      {/* <!-- Start Button --> */}
                      <div onTouchStart={() => this.handleKeyDown(Controller.BUTTON_START)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_START)}></div>

                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="ab">
              <ul>
                <li>
                  {/*<!-- B Button -->*/}
                  <div onTouchStart={() => this.handleKeyDown(Controller.BUTTON_B)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_B)}></div>

                </li>
                <li>
                  {/* <!-- A Button --> */}
                  <div onTouchStart={() => this.handleKeyDown(Controller.BUTTON_A)} onTouchEnd={() => this.handleKeyUp(Controller.BUTTON_A)}></div>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}