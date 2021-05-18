import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./components/Login";
import Notes from "./components/Notes";
import SignUp from "./components/signup";
import Upload from "./components/Upload";
import Home from "./components/Home";
import Contact from "./components/contact";
import { AuthProvider } from "./components/AuthProvider";

import PasswordReset from "./components/PasswordReset";
import Course from "./components/Course";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={Nav} />
        <Route exact path="/courses"component={Course} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/notes" component={Notes} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/resetpassword" component={PasswordReset} />
      </Router>
    </AuthProvider>
  );
}

export default App;
