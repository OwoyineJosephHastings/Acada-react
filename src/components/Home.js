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
    </div>
  );
}

export default Home;
