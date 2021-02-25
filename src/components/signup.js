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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === passwordRetype) {
      projectAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setError(null);
          history.push("/");
        })
        .catch((error) => {
          var errorMessage = error.message;
          setError(errorMessage);
        });
    } else setError("Passwords do not match");

    // ...
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "60%" }}>
      <fieldset>
        <legend>
          <h3> CREATE NEW ACOUNT</h3>
        </legend>
        {error && (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Oh Sorry! </strong> {error}
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={(e) => setError(null)}
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
        <div className="form-group">
          <button>Sign up</button>
          <strong className="mx-auto">
            <span>
              Already have an account
              <Link to="/login"> click here to sign in </Link>
            </span>
          </strong>
        </div>
      </fieldset>
    </form>
  );
};
export default withRouter(SignUp);
