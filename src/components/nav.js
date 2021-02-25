import React, { Component } from "react";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";

export class Nav extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-md bg-dark navbar-dark"
        style={{ width: "100%" }}
      >
        <nav className="navbar navbar-light bg-dark">
          <div className="container-fluid ">
            <Link className="navbar-brand" to="/">
              <img
                src="https://github.com/OwoyineJosephHastings/Acada/blob/main/resorces/images/logo.png?raw=true"
                alt=""
                width="30"
                height="24"
                className="d-inline-block align-top"
              />
              ACADA
            </Link>
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
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notes" className="nav-link">
                Academic notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notes">
                Past Papers
              </Link>
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
