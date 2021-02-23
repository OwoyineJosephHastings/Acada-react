import { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import { AuthContext } from "./AuthProvider";

const Login = ({ history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        history.push("/notes");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    // ...
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/notes" />;
  }

  return (
    <form>
      <fieldset>
        <legend>
          <h1> ACADA LOGIN</h1>
        </legend>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">User password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" style={{ display: "flex" }}>
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
          Need an acount? <Link to="/signup">Sign up</Link>
        </div>
      </fieldset>
    </form>
  );
};
export default withRouter(Login);
