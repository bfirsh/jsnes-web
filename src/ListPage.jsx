import React, { Component } from "react";
import "./ListPage.css";
import { Container, ListGroup } from "reactstrap";
import { Link } from "react-router-dom";

class ListPage extends Component {
  render() {
    const roms = {
      "Bubble Bobble (U).nes": "Bubble Bobble",
      "Contra (U) [!].nes": "Contra",
      "Donkey Kong (JU).nes": "Donkey Kong",
      "Dr. Mario (JU).nes": "Dr. Mario",
      "Golf (JU).nes": "Golf",
      "Legend of Zelda, The (U) (PRG1).nes": "The Legend of Zelda",
      "Lemmings (U).nes": "Lemmings",
      "Lifeforce (U).nes": "Lifeforce",
      "Mario Bros. (JU) [!].nes": "Mario Bros.",
      "Mega Man (U).nes": "Mega Man",
      "Pac-Man (U) [!].nes": "Pac-Man",
      "Super Mario Bros. (JU) (PRG0) [!].nes": "Super Mario Bros.",
      "Super Mario Bros. 3 (U) (PRG1) [!].nes": "Super Mario Bros. 3",
      "Tennis (JU) [!].nes": "Tennis",
      "Tetris (U) [!].nes": "Tetris",
      "Tetris 2 (U) [!].nes": "Tetris 2",
      "Zelda II - The Adventure of Link (U).nes":
        "Zelda II - The Adventure of Link"
    };

    return (
      <Container className="ListPage">
        <header className="mt-3">
          <h1>JSNES</h1>
          <p>A JavaScript NES emulator.</p>
        </header>
        <ListGroup>
          {Object.keys(roms).map(key => (
            <Link
              key={ key }
              to={ "/run/" + encodeURIComponent(key) }
              className="list-group-item"
            >
              {roms[key]}
              <span className="float-right">&rsaquo;</span>
            </Link>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default ListPage;
