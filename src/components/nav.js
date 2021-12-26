import React from "react";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import logo from "../statics/logo.png";
import { useAuth } from "./AuthProvider";

export default function Nav() {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    projectAuth.signOut();
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-success navbar-dark"
      style={{
        width: "100%",
      }}
    >
      <div className="bg-success">
        <div className="container-fluid ">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Acada logo"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <span className="navbar-brand-title ml-2">ACADA</span>
          </Link>
        </div>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="collapsibleNavbar"
        style={{ justifyContent: "center" }}
      >
        <ul className="navbar-nav p-2">
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

          {currentUser && (
            <li className="nav-item ml-lg-5">
              <Link
                className="nav-link"
                to="#"
                onClick={e => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </li>
          )}

          <li className="nav-item"></li>
        </ul>
      </div>
    </nav>
  );
}
