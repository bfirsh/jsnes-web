import {tryCreateGamepadController} from "./GamepadController";
import KeyboardController from "./KeyboardController";

/**
 * Properties of options:
 * - onButtonDown callback that takes two arguments: a player number (1 or 2)
 *   and a button ID such as Controller.BUTTON_A.
 * - onButtonUp callback that takes two arguments: a player number (1 or 2)
 *   and a button ID such as Controller.BUTTON_A.
 */
export function createControllers(options) {
  const gamepadController = tryCreateGamepadController(options);

  if (gamepadController != null) {
    // TODO: Listen for the "gamepaddisconnected" event.
    console.info('Using GamepadController.');
    return gamepadController;
  } else {
    console.info('Using KeyboardController.');
    return new KeyboardController(options);
  }
}
