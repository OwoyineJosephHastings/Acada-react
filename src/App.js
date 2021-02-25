import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./components/Login";
import Notes from "./components/Notes";
import SignUp from "./components/signup";
import Upload from "./components/Upload";

import { AuthProvider } from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={Nav} />
        <PrivateRoute exact path="/notes" component={Notes} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/upload" component={Upload} />
      </Router>
    </AuthProvider>
  );
}

export default App;
