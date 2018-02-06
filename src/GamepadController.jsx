import { Controller } from "jsnes";

export function tryCreateGamepadController(options) {
  const gamepads = findConnectedGamepads();
  if (gamepads.length > 0) {
    return new GamepadController(gamepads, options);
  } else {
    return null;
  }
}

function findConnectedGamepads() {
  let connectedGamepads = [];
  try {
    const gamepads = navigator.getGamepads();
    // Note that gamepads.length may be non-zero, but all of its items may be
    // null. Although it is not an Array, it is iterable.
    for (const gamepad of gamepads) {
      if (gamepad != null && gamepad.connected) {
        connectedGamepads.push(gamepad);
      }
    }
  } catch (e) {
    console.error("Error when calling navigator.getGamepads():", e);
  }

  return connectedGamepads;
}

class GamepadController {
  constructor(gamepads, options) {
    this.setGamepadStates(gamepads);
    this.onButtonDown = options.onButtonDown;
    this.onButtonUp = options.onButtonUp;

    this.polling = false;
    this.startPolling();
  }

  setGamepadStates(gamepads) {
    this.gamepadStates = gamepads.map(createInitialGamepadState);
  }

  startPolling() {
    if (!this.polling) {
      this.polling = true;
      this.poll();
    }
  }

  poll = () => {
    if (!this.polling) {
      return;
    }

    for (let i = 0, len = this.gamepadStates.length; i < len; i++) {
      this.checkGamepad(i);
    }

    window.requestAnimationFrame(this.poll);
  };

  /**
   * Checks to see if the button state for any of a gamepad's buttons have
   * changed, and if so, call this.onButtonUp() or this.onButtonDown(), as
   * appropriate.
   */
  checkGamepad(index) {
    const {gamepad, lastModified, buttons: oldButtons} = this.gamepadStates[index];
    if (gamepad !== navigator.getGamepads()[index]) {
      // Empirically, if navigator.getGamepads() is not read explicitly, then
      // the fields on the Gamepad do not appear to get refreshed. If this
      // check fails, then presumably some Gamepads have been
      // connected/disconnected, so we use this opportunity to reset all of
      // the internal data structures.
      const connectedGamepads = findConnectedGamepads();
      // Note that connectedGamepads.length could be zero!
      this.setGamepadStates(connectedGamepads);
      return;
    }

    // According to MDN, Firefox does not support the timestamp property yet.
    const newTimestamp = gamepad.timestamp;
    if (lastModified === newTimestamp) {
      return;
    }

    const newButtons = createButtonState(gamepad);
    this.gamepadStates[index] = {
      gamepad, lastModified: newTimestamp, buttons: newButtons,
    };

    const playerIndex = index + 1;
    this.checkButton(playerIndex, oldButtons.b, newButtons.b, Controller.BUTTON_B);
    this.checkButton(playerIndex, oldButtons.a, newButtons.a, Controller.BUTTON_A);
    this.checkButton(playerIndex, oldButtons.select, newButtons.select, Controller.BUTTON_SELECT);
    this.checkButton(playerIndex, oldButtons.start, newButtons.start, Controller.BUTTON_START);
    this.checkButton(playerIndex, oldButtons.left, newButtons.left, Controller.BUTTON_LEFT);
    this.checkButton(playerIndex, oldButtons.right, newButtons.right, Controller.BUTTON_RIGHT);
    this.checkButton(playerIndex, oldButtons.up, newButtons.up, Controller.BUTTON_UP);
    this.checkButton(playerIndex, oldButtons.down, newButtons.down, Controller.BUTTON_DOWN);
  }

  checkButton(playerIndex, oldButtons, newButtons, button) {
    if (oldButtons !== newButtons) {
      if (oldButtons) {
        this.onButtonUp(playerIndex, button);
      } else {
        this.onButtonDown(playerIndex, button);
      }
    }
  }

  stopPolling() {
    this.polling = false;
  }

  dispose() {
    this.stopPolling();
  }
}

function createInitialGamepadState(gamepad) {
  return {
    gamepad,
    lastModified: gamepad.timestamp,
    buttons: createButtonState(gamepad),
  };
}

function createButtonState(gamepad) {
  // Note that the indexes into gamepad.buttons should be configurable.
  // These values are hardcoded for the RetroUSB.com RetroPad. Ideally, we
  // would provide a GUI that would let the user set these. As a workaround,
  // we could make this settable via localStorage.
  const {buttons, axes} = gamepad;
  return {
    b: buttons[0].pressed,
    a: buttons[1].pressed,
    select: buttons[2].pressed,
    start: buttons[3].pressed,
    left: axes[0] === -1.0,
    right: axes[0] === 1.0,
    up: axes[1] === -1.0,
    down: axes[1] === 1.0,
  };
}
