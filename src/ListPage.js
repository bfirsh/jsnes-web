import React, { Component } from "react";
import "./ListPage.css";
import { ListGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import config from "./config";

import RomLibrary from "./RomLibrary";

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      romLibrary: RomLibrary.load(),
      showRomLibraryInfo: false,
      editingRoms: false
    };
  }
  render() {
    const editingRoms = this.state.editingRoms;
    const deleteRom = this.deleteRom;
    const romLib = this.state.romLibrary.map(function(o) {
      return (
        <a href={"run/local-" + o.hash}>
          <div key={o.hash} className="list-group-item">
            {o.name}
            {editingRoms ? (
              <Button
                className="float-right"
                size="sm"
                color="danger"
                onClick={e => {
                  e.preventDefault();
                  deleteRom(o.hash);
                }}
              >
                Delete
              </Button>
            ) : (
              <span className="float-right">&rsaquo;</span>
            )}
          </div>
        </a>
      );
    });

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
              <p>
                A JavaScript NES emulator.{" "}
                <a href="https://github.com/bfirsh/jsnes">Source on GitHub.</a>
              </p>
            </header>
            <div>
              <p>
                <Button
                  color={this.state.showRomLibraryInfo ? "secondary" : "primary"}
                  onClick={() =>
                    this.setState({
                      showRomLibraryInfo: !this.state.showRomLibraryInfo
                    })
                  }
                >
                  {this.state.showRomLibraryInfo ? "- Collapse ROM info" : "+ Add ROM files"}
                </Button>
              </p>
              {this.state.showRomLibraryInfo ? (
                <p>
                  Drag &amp; drop your desired ROM files to this window and they
                  will be copied into your local browser cache to be accessed
                  later whenever you visit this page.
                </p>
              ) : null}
            </div>

            {romLib.length > 0 ? (
              <div>
                <h2>Your ROM library</h2>
                <p>
                  <Button
                    outline
                    color="secondary"
                    size="sm"
                    onClick={this.toggleRomEditing}
                  >
                    {this.state.editingRoms ? "Stop editing ROMs" : "Edit ROMs"}
                  </Button>
                </p>
                <div className="mb-4">{romLib}</div>
              </div>
            ) : null}

            <h2>Preinstalled ROMs</h2>

            <ListGroup className="mb-4">
              {Object.keys(config.ROMS)
                .sort()
                .map(key => (
                  <Link
                    key={key}
                    to={"/run/" + encodeURIComponent(key)}
                    className="list-group-item"
                  >
                    {config.ROMS[key]["name"]}
                    <span className="float-right">&rsaquo;</span>
                  </Link>
                ))}
            </ListGroup>
            <p>
              If you want to play ROMs that aren't listed here, Google might be
              able to help. (
              <a
                href="https://www.ign.com/articles/2018/11/13/nintendo-rom-site-lawsuit-results-in-12-million-judgement"
                target="_blank"
                rel="noopener noreferrer"
              >
                Only Homebrew ROMs are listed.
              </a>
              )
            </p>
            <p>
              Have a suggestion for a ROM, or want your ROM listed here?{" "}
              <a href="https://github.com/bfirsh/jsnes-web/issues/new">
                Open an issue on GitHub!
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  deleteRom = hash => {
    RomLibrary.delete(hash);
    this.updateLibrary();
  };

  toggleRomEditing = () =>
    this.setState({ editingRoms: !this.state.editingRoms });

  updateLibrary = () => {
    this.setState({ romLibrary: RomLibrary.load() });
  };

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  handleDrop = e => {
    e.preventDefault();

    const file = e.dataTransfer.items
      ? e.dataTransfer.items[0].getAsFile()
      : e.dataTransfer.files[0];

    this.setState({ editingRoms: false });
    RomLibrary.save(file).then(this.updateLibrary);
  };
}

export default ListPage;
