import { useState, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import { AuthContext } from "./AuthProvider";

const Login = ({ history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    history.push("/notes");
  }

  const { email, password } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setError(null);
        setLoading(false);
        history.push("/notes");
      })
      .catch((error) => {
        var errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });

    // ...
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1> ACADA LOGIN</h1>
      <form>
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
        <fieldset>
          <legend>DETAILS</legend>
          <div className="form-group">
            {loading && (
              <div
                class="spinner-border text-primary mx-auto"
                role="status"
              ></div>
            )}
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
          </div>
          <div className="form-control">
            <span className="mx-auto">
              Need an acount? <Link to="/signup">Sign up</Link>
            </span>
            <p></p>
            <span className="mx-auto">
              Trouble Signing in?{" "}
              <Link to="/resetpassword">Reset password</Link>
            </span>
          </div>
        </fieldset>
      </form>
    </>
  );
};
export default withRouter(Login);
