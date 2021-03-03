import { useState, useContext } from "react";
import { Redirect, useLocation, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import { AuthContext } from "./AuthProvider";

const Login = ({ history }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { locationState } = useLocation();
  if (currentUser) {
    return <Redirect to={locationState?.from || "/"} />;
  }

  const { email, password } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setError(null);
        setLoading(false);
        history.push(locationState?.from || "/");
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
      <form className="bg-white">
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
                className="spinner-border text-primary mx-auto"
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
          <div className="form-group">
            <div className=" div mx-auto">
              Need an acount? <Link to="/signup">Sign up</Link>
            </div>

            <div className=" div mx-auto bg-white">
              Trouble Signing in?{" "}
              <Link to="/resetpassword">Reset password</Link>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};
export default withRouter(Login);
