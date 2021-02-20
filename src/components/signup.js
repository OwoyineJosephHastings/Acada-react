import { useState } from "react";
import { projectAuth } from "../firebase/config";

export default function SignUp() {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordRetype: "",
  });

  const { email, password, passwordRetype } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyPassword();
    projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
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
  const verifyPassword = (e) => {
    if (password !== passwordRetype) {
      setState({ email: "", password: "", passwordRetype: "" });
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <h3> CREATE NEW ACOUNT</h3>
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
        </div>
      </fieldset>
    </form>
  );
}
