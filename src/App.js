import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./components/Login";
import Notes from "./components/Notes";
import SignUp from "./components/signup";
import Upload from "./components/Upload";
import Contact from "./components/contact";
import { AuthProvider } from "./components/AuthProvider";

import PasswordReset from "./components/PasswordReset";
import ShowContacts from "./components/ShowContacts";
import Home from "./components/Home";
import UserContacts from "./components/coureses/UserContacts";
import Course from "./components/Course";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import { projectAuth } from "./firebase/config";
import Footer from "./components/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    projectAuth.onAuthStateChanged(user => {
      setLoading(false);
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthProvider auth={{ currentUser, loading }}>
      <Router>
        <Nav />
        <Switch>
          <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          <Route path="/usercontacts" component={ShowContacts} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/courses/:id" component={Course}></Route>
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/upload" component={Upload} />
          <Route exact path="/usercontacts" component={UserContacts} />
          <Route exact path="/resetpassword" component={PasswordReset} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
