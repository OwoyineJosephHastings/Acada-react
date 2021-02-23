import React, { Component } from "react";
import { projectAuth } from "../firebase/config";

export class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <nav className="navbar navbar-light bg-dark">
          <div className="container-fluid ">
            <a className="navbar-brand" href="index.html">
              <img
                src="logo"
                alt=""
                width="30"
                height="24"
                className="d-inline-block align-top"
              />
              ACADA
            </a>
          </div>
        </nav>

        <a className="navbar-brand" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="notes">
                Academic notes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="notes">
                Past Papers
              </a>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-danger"
                onClick={(e) => projectAuth.signOut()}
              >
                Signout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;