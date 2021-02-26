import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";

function PasswordReset({ history }) {
  var email = useRef(null);
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.current.value) {
      projectAuth
        .sendPasswordResetEmail(email.current.value)
        .then(function () {
          alert(
            "password reset email has been sent to:\n " + email.current.value
          );
          history.push("/login");
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Email is required");
    }
  };

  const handleChange = (e) => {
    console.log(email.current.value);
  };

  return (
    <div
      className="container border border-success"
      style={{ maxWidth: "60%", marginTop: "8%" }}
    >
      <h4>ACADA-Password reset</h4>
      <form className="form" style={{}}>
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Oh Sorry! </strong> {error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={(e) => setError(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">User email</label>
          <input
            type="email"
            name="email"
            ref={email}
            onChange={handleChange}
            placeholder="Enter current user email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Reset Password
          </button>
        </div>
        <span className="mx-auto">
          Back to: <Link to="/login">signin</Link>
        </span>
      </form>
    </div>
  );
}

export default PasswordReset;
