import React, { Component } from "react";
import "./ListPage.css";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";

const roms = {
  "Bubble Bobble (U).nes": "Bubble Bobble",
  "Castlevania (U) (PRG1).nes": "Castlevania",
  "Contra (U) [!].nes": "Contra",
  "Donkey Kong (JU).nes": "Donkey Kong",
  "Dr. Mario (JU).nes": "Dr. Mario",
  "Duck Hunt (JUE) [!].nes": "Duck Hunt",
  "Final Fantasy (U) [!].nes": "Final Fantasy",
  "Golf (JU).nes": "Golf",
  "Kirby's Adventure (U) (PRG1) [!].nes": "Kirby's Adventure",
  "Legend of Zelda, The (U) (PRG1).nes": "The Legend of Zelda",
  "Lemmings (U).nes": "Lemmings",
  "Lifeforce (U).nes": "Lifeforce",
  "Mario Bros. (JU) [!].nes": "Mario Bros.",
  "Mega Man (U).nes": "Mega Man",
  "Metal Gear (U).nes": "Metal Gear",
  "Metroid (U) [!].nes": "Metroid",
  // FIXME: Mapper 009
  // "Mike Tyson's Punch-Out!! (U) (PRG1).nes": "Mike Tyson's Punch-Out!!",
  "Pac-Man (U) [!].nes": "Pac-Man",
  "Super Mario Bros. (JU) (PRG0) [!].nes": "Super Mario Bros.",
  "Super Mario Bros. 2 (U) (PRG0) [!].nes": "Super Mario Bros. 2",
  "Super Mario Bros. 3 (U) (PRG1) [!].nes": "Super Mario Bros. 3",
  "Tecmo Super Bowl (U).nes": "Tecmo Super Bowl",
  "Teenage Mutant Ninja Turtles II - The Arcade Game (U) [!].nes": "Teenage Mutant Ninja Turtles II - The Arcade Game",
  "Tennis (JU) [!].nes": "Tennis",
  "Tetris (U) [!].nes": "Tetris",
  "Tetris 2 (U) [!].nes": "Tetris 2",
  "Zelda II - The Adventure of Link (U).nes":
    "Zelda II - The Adventure of Link"
};

class ListPage extends Component {
  render() {
    return (
      <div
        className="container ListPage my-4"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className="row justify-content-center">
          <div className="col-md-8">
            <header className="mb-4">
              <h1 className="mb-3">JSNES</h1>
              <p>A JavaScript NES emulator.</p>
              <p>
                By <a href="https://fir.sh">Ben Firshman</a>. Source on{" "}
                <a href="https://github.com/bfirsh/jsnes">GitHub</a>.
              </p>
            </header>
            <ListGroup className="mb-4">
              {Object.keys(roms).map(key => (
                <Link
                  key={key}
                  to={"/run/" + encodeURIComponent(key)}
                  className="list-group-item"
                >
                  {roms[key]}
                  <span className="float-right">&rsaquo;</span>
                </Link>
              ))}
            </ListGroup>
            <p>Or, drag and drop a ROM file onto the page.</p>
          </div>
        </div>
      </div>
    );
  }

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  handleDrop = e => {
    e.preventDefault();

    const file = e.dataTransfer.items
      ? e.dataTransfer.items[0].getAsFile()
      : e.dataTransfer.files[0];

    this.props.history.push({ pathname: "/run", state: { file } });
  };
}

export default ListPage;
