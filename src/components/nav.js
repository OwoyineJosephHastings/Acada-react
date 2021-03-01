import React, { Component } from "react";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import logo from "../statics/logo.png";

export class Nav extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-md bg-success navbar-dark"
        style={{ width: "100%", minHeight: "15vh" }}
      >
        <nav className="navbar navbar-dark bg-success">
          <div className="container-fluid ">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt=""
                width="30"
                height="40%"
                className="d-inline-block align-top"
              />
            </Link>
          </div>
        </nav>

        <a className="navbar-brand" href="/">
          ACADA
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
              <Link className="nav-link" to="/contact">
                Contact us
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
