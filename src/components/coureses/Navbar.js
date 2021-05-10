import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="react_html.html">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Courses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Surport</a>
              </li>    
            </ul>
          </div>  
        </nav>
        </div>
    );
}

export default Navbar;
