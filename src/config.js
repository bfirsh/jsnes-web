import React from "react";

const config = {
  ROMS: {
    owlia: {
      name: "The Legends of Owlia",
      description: (
        <span>
          <a
            href="http://www.gradualgames.com/p/the-legends-of-owlia_1.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Owlia by Gradual Games
          </a>{" "}
          /{" "}
          <a
            href="http://www.infiniteneslives.com/owlia.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy the cartridge
          </a>
        </span>
      ),
      url: "https://cdn.jsdelivr.net/gh/bfirsh/jsnes-roms@master/owlia.nes"
    },
    nomolos: {
      name: "Nomolos: Storming the Catsle",
      description: (
        <span>
          <a
            href="http://www.gradualgames.com/p/nomolos-storming-catsle.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Monolos by Gradual Games
          </a>{" "}
          /{" "}
          <a
            href="http://www.infiniteneslives.com/nomolos.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy the cartridge
          </a>
        </span>
      ),
      url: "https://cdn.jsdelivr.net/gh/bfirsh/jsnes-roms@master/nomolos.nes"
    },
    croom: {
      name: "Concentration Room",
      description: (
        <span>
          <a
            href="http://www.pineight.com/croom/README"
            target="_blank"
            rel="noopener noreferrer"
          >
            Concentration Room
          </a>{" "}
          by Damian Yerrick
        </span>
      ),
      url:
        "https://cdn.jsdelivr.net/gh/bfirsh/jsnes-roms@master/croom/croom.nes"
    },
    lj65: {
      name: "LJ65",
      description: (
        <span>
          <a
            href="http://harddrop.com/wiki/LJ65"
            target="_blank"
            rel="noopener noreferrer"
          >
            Concentration Room
          </a>{" "}
          by Damian Yerrick
        </span>
      ),
      url: "https://cdn.jsdelivr.net/gh/bfirsh/jsnes-roms@master/lj65/lj65.nes"
    }
  },
  GOOGLE_ANALYTICS_CODE: process.env.REACT_APP_GOOGLE_ANALYTICS_CODE,
  SENTRY_URI: process.env.REACT_APP_SENTRY_URI
};

export default config;
