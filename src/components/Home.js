import React from "react";


function Home() {
  return (
    <div
      className="container "
      style={{
        marginLeft: "0%",
        margin: "0%",
      }}
    >
      <div
        className="jumbotron"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "0%",
        }}
      >
        <h1 className="display-6">ACADA </h1>
        <h4>Home of academic materials</h4>
        <hr />
        <h6>Reading sucks but not more than failure</h6>
        <div
          className="container mx-auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <a
            className="  btn btn-primary "
            href="login"
            role="button"
            style={{ minWidth: "7.5rem" }}
          >
            Sign in
          </a>
          <a
            className=" btn btn-outline-success"
            href="signup"
            style={{ minWidth: "7.5rem" }}
            role="button"
          >
            Sign up
          </a>
        </div>
      </div>
     
      <footer
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          color: "white",
          backgroundColor: "lightgray",
          textAlign: "center",
        }}
      >
        <div
          className="div"
          style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
        >
          <a href="http://www.instagram.com" target="blank">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="http://www.twitter.com" target="blank">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="http://www.facebook.com" target="blank">
            <i className="bi bi-facebook"></i>
          </a>
        </div>
        <ul
          className="list-inline"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <li className="list-inline-item">
            <a href="/">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="/notes">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="/contact">Help</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">ACADA © 2021</p>
      </footer>
    </div>
  );
}

export default Home;
