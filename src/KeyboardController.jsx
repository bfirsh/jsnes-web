import { Controller } from "jsnes";

// Mapping keyboard code to [controller, button]
const KEYS = {
  88: [1, Controller.BUTTON_A], // X
  89: [1, Controller.BUTTON_B], // Y (Central European keyboard)
  90: [1, Controller.BUTTON_B], // Z
  17: [1, Controller.BUTTON_SELECT], // Right Ctrl
  13: [1, Controller.BUTTON_START], // Enter
  38: [1, Controller.BUTTON_UP], // Up
  40: [1, Controller.BUTTON_DOWN], // Down
  37: [1, Controller.BUTTON_LEFT], // Left
  39: [1, Controller.BUTTON_RIGHT], // Right
  103: [2, Controller.BUTTON_A], // Num-7
  105: [2, Controller.BUTTON_B], // Num-9
  99: [2, Controller.BUTTON_SELECT], // Num-3
  97: [2, Controller.BUTTON_START], // Num-1
  104: [2, Controller.BUTTON_UP], // Num-8r
  98: [2, Controller.BUTTON_DOWN], // Num-2
  100: [2, Controller.BUTTON_LEFT], // Num-4
  102: [2, Controller.BUTTON_RIGHT] // Num-6
};
const ALT_KEYS = {
  //Alternative Controls (Don't currently conflict with current ones)
  //P1
  70: [1, Controller.BUTTON_A], //F
  71: [1, Controller.BUTTON_B], //G
  87: [1, Controller.BUTTON_UP], //W
  83: [1, Controller.BUTTON_DOWN], //S
  65: [1, Controller.BUTTON_LEFT], //A
  68: [1, Controller.BUTTON_RIGHT], //Date
  17: [1, Controller.BUTTON_SELECT], // Right Ctrl
  13: [1, Controller.BUTTON_START], // Enter
  //P2
  186: [2, Controller.BUTTON_A], // ;
  222: [2, Controller.BUTTON_B], // '
  191: [2, Controller.BUTTON_SELECT], // /
  190: [2, Controller.BUTTON_START], // .r
  38: [2, Controller.BUTTON_UP], // Up
  40: [2, Controller.BUTTON_DOWN], // Down
  37: [2, Controller.BUTTON_LEFT], // Left
  39: [2, Controller.BUTTON_RIGHT] // Right
};

export default class KeyboardController {
  constructor(options) {
    this.onButtonDown = options.onButtonDown;
    this.onButtonUp = options.onButtonUp;
    this.altButtons = false;
  }

  handleKeyDown = e => {
    var key = null;
    if (this.altButtons) key = ALT_KEYS[e.keyCode];
    else key = KEYS[e.keyCode];
    if (key) {
      this.onButtonDown(key[0], key[1]);
      e.preventDefault();
    }
  };

  handleKeyUp = e => {
    var key = null;
    if (this.altButtons) {
      key = ALT_KEYS[e.keyCode];
    } else key = KEYS[e.keyCode];
    if (key) {
      this.onButtonUp(key[0], key[1]);
      e.preventDefault();
    }
  };

  handleKeyPress = e => {
    e.preventDefault();
  };

  toggleControls = e => {
    this.altButtons ? (this.altButtons = false) : (this.altButtons = true);
  };
}
