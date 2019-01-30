import React, { Component } from "react";
import "./ListPage.css";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import config from "./config";
import jsonp from "jsonp";

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NesOpenDBData: null
    };
  }
  componentDidMount() {
    jsonp(
      "https://nes-open-db.github.io/api/v1/rawdump-jsonp.js",
      { name: "NesOpenDB_rawDump" },
      (err, data) => this.setState({ NesOpenDBData: data })
    );
  }
  render() {
    const romList =
      this.state.NesOpenDBData &&
      this.state.NesOpenDBData.roms_index.map(function(rom) {
        return (
          <Link
            key={rom.key}
            to={
              "/run/url/?" +
              encodeURIComponent("https://nes-open-db.github.io") +
              encodeURIComponent(rom.romLink)
            }
            className="list-group-item"
          >
            {rom.title}
            <span className="float-right">&rsaquo;</span>
          </Link>
        );
      });

    const openDbList = this.state.NesOpenDBData ? (
      <div>
        <h2>
          ROMs from <a href="https://nes-open-db.github.io/">NES Open DB</a>
        </h2>
        <ListGroup className="mb-4">{romList}</ListGroup>
      </div>
    ) : null;

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
            {openDbList}
            <p>Or, drag and drop a ROM file onto the page.</p>
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
