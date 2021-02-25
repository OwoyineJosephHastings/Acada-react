import React from "react";

function Home() {
  return (
    <div
      className="container "
      style={{
        marginLeft: "0%",
        margin: "0%",
        backgroundImage:
          "URL(https://github.com/OwoyineJosephHastings/Acada/blob/main/resorces/images/logo.png?raw=true)",
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
        <div>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="login" role="button">
              Sign in
            </a>
            <a
              className="btn btn-outline-success btn-lg"
              href="signup"
              role="button"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
