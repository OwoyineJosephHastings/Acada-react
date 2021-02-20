import { useState } from "react";
import { projectAuth } from "../firebase/config";

export default function Login() {
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

  return (
    <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </fieldset>
    </form>
  );
}
