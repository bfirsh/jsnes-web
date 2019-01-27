# JSNES Web UI

A React-based web UI for [JSNES](https://github.com/bfirsh/jsnes).

## Running in development

    $ yarn install
    $ yarn start

## Building for production

    $ yarn build

The built app will be in `build/`.

## Running tests

    $ yarn test

## Formatting code

All code must conform to [Prettier](https://prettier.io/) formatting. The test suite won't pass unless it does.

To automatically format all your code, run:

    $ yarn run format

## Adding roms

Open `src/config.js` and add a new key under the defined `config.ROMS`. For example:

    myrom: {
      name: "My Rom",
      description: <span>This is my own homebrew NES rom</span>,
      url: "http://localhost:3000/roms/myrom/myrom.nes"
    }

If you add your rom file now under `public/roms/myrom/myrom.nes`, the game should start playing as you navigate to http://localhost:3000/run/myrom