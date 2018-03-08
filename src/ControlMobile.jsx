import React, { Component } from "react";
import { Controller } from "jsnes";
import "./ControlMobile.css";

export default class ControlMobile extends Component {
  constructor() {
    super();
    this.touchedPadButtonTag = null;
  }

  handleKeyDown = (p_button) => {
    this.props.onButtonDown(1, p_button);
  };

  handleKeyUp = (p_button) => {
    this.props.onButtonUp(1, p_button);
  };

  /**
   * Touchpad fluidity 
   * Enable the user to move between control pad arrows
   * without getting his finger up.
   */
  padTouchMove = (e) => {
    const currentElement = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
    let lastTag = this.touchedPadButtonTag;
    this.touchedPadButtonTag = this.getTagFromElement(currentElement);

    if (lastTag !== this.touchedPadButtonTag) {
      if (lastTag) {
        this.handleKeyUp(lastTag);
      }
      if (this.touchedPadButtonTag) {
        this.handleKeyDown(this.touchedPadButtonTag);
      }
    }
  };

  padTouchStart = (e) => {
    this.touchedPadButtonTag = this.getTagFromElement(e.target);

    if (this.touchedPadButtonTag) {
      this.handleKeyDown(this.touchedPadButtonTag);
    }
  }

  padTouchEnd = (e) => {
    if (this.touchedPadButtonTag) {
      this.handleKeyUp(this.touchedPadButtonTag);
    }
  }

  getTagFromElement = (p_element) => {
    let tag = null;

    if (p_element.classList.contains('up')) {
      tag = Controller.BUTTON_UP;
    } else if (p_element.classList.contains('down')) {
      tag = Controller.BUTTON_DOWN;
    } else if (p_element.classList.contains('left')) {
      tag = Controller.BUTTON_LEFT;
    } else if (p_element.classList.contains('right')) {
      tag = Controller.BUTTON_RIGHT;
    }

    return tag;
  }

  render() {
    return (
      <div className="gbasp">
        <div className="controller">
          <div className="inner">
            <div className="controlpad">
              <div className="outer" onTouchStart={this.padTouchStart} onTouchEnd={this.padTouchEnd} onTouchMove={this.padTouchMove}>
                <div className="dpad_outer">
                  <div className="dpad_corner tl"></div>

                  {/* <!-- D-Pad Up --> */}
                  <div className="dpad_bt up"></div>

                  <div className="dpad_corner tr"></div>

                  {/* <!-- D-Pad Left --> */}
                  <div className="dpad_bt left"></div>

                  <div className="dpad_inner"></div>

                  {/* <!-- D-Pad Right --> */}
                  <div className="dpad_bt right" ></div>

                  <div className="dpad_corner bl"></div>

                  {/* <!-- D-Pad Down --> */}
                  <div className="dpad_bt down"></div>

                  <div className="dpad_corner br"></div>
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