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

## Embedding JSNES in your own app

Unfortunately this isn't trivial at the moment. The best way is copy and paste code from this repository into a React app, then use the [`<Emulator>`](https://github.com/bfirsh/jsnes-web/blob/master/src/Emulator.js). [Here is a usage example.](https://github.com/bfirsh/jsnes-web/blob/d3c35eec11986412626cbd08668dbac700e08751/src/RunPage.js#L119-L125).

A project for potential contributors (hello!): jsnes-web should be reusable and on NPM! It just needs compiling and bundling.

## Adding roms

Open `src/config.js` and add a new key to `config.ROMS`. For example:

```javascript
const config = {
  ROMS: {
    // ...
    myrom: {
      name: "My Rom",
      description: <span>This is my own homebrew NES rom</span>,
      url: "http://localhost:3000/roms/myrom/myrom.nes"
    }
  }
}
```

Then, add the ROM file as `public/roms/myrom/myrom.nes`. The ROM should now be available to play at http://localhost:3000/run/myrom
