import KeyboardController from "./KeyboardController";

/**
 * Properties of options:
 * - onButtonDown callback that takes two arguments: a player number (1 or 2)
 *   and a button ID such as Controller.BUTTON_A.
 * - onButtonUp callback that takes two arguments: a player number (1 or 2)
 *   and a button ID such as Controller.BUTTON_A.
 */
export function createControllers(options) {
  const keyboardController = new KeyboardController(options);
  document.addEventListener("keydown", keyboardController.handleKeyDown);
  document.addEventListener("keyup", keyboardController.handleKeyUp);
  document.addEventListener("keypress", keyboardController.handleKeyPress);
  return keyboardController;
}
