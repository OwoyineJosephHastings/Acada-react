import { useState } from "react";
import { Redirect, useLocation, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import Loading from "../Helper/Loading";
import { useAuth } from "./AuthProvider";

const Login = ({ history }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, loading: loadingUser } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const redirect_to = new URLSearchParams(location.search).get("redirect_to") || "/";
  if (loadingUser) return <Loading property="auth state" />;

  if (currentUser) {
    return <Redirect to={{ pathname: redirect_to }} />;
  }

  const { email, password } = state;

  const handleSubmit = e => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setError(null);
        setLoading(false);
        history.push(redirect_to);
      })
      .catch(error => {
        var errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-wrapper">
      <h2 className="text-primary">ACADA LOGIN</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Oh Sorry! </strong> {error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={e => setError(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <fieldset>
          <p className="text-muted mb-0">Enter your email and password</p>
          <div className="form-group">
            {loading && <div className="spinner-border text-primary mx-auto" role="status"></div>}
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
          <div className="form-group">
            <button type="sumit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="form-group">
            <p className="mb-0">
              Need an acount? <Link to="/signup">Sign up</Link>
            </p>
            <p>
              Trouble Signing in? <Link to="/resetpassword">Reset password</Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default withRouter(Login);
