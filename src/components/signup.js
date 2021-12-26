import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SignUp = ({ history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordRetype: "",
  });
  const [error, setError] = useState(null);

  const { email, password, passwordRetype } = state;

  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    e.target.setAttribute("disabled", true);

    if (password === passwordRetype) {
      setLoading(true);
      projectAuth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          setLoading(false);
          setError(null);
          e.target.setAttribute("disabled", false);
          history.push("/");
        })
        .catch(error => {
          setLoading(false);
          e.target.setAttribute("disabled", false);
          var errorMessage = error.message;
          setError(errorMessage);
        });
    } else setError("Passwords do not match");
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="login-wrapper">
      <fieldset>
        <legend>
          <h3> CREATE NEW ACOUNT</h3>
        </legend>
        {loading && <div className="spinner-border text-primary mx-auto" role="status"></div>}
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
        <div className="form-group">
          <label htmlFor="passwordRetype">Comfirm Password</label>
          <input
            name="passwordRetype"
            type="password"
            placeholder="Password Comfirmation"
            id="passwordRetype"
            value={passwordRetype}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-0">
          <button type="submit" disabled={loading}>
            Sign up
          </button>
        </div>
        <div className="form-group mt-0">
          <span>
            Already have an account?
            <Link to="/login"> Sign in </Link>
          </span>
        </div>
      </fieldset>
    </form>
  );
};
export default withRouter(SignUp);
