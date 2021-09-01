import React from "react";
import { useState, useEffect } from "react";

import { projectDatabase } from "../firebase/config";
import Loading from "../Helper/Loading";
import CourseCard from "./CourseCard";
function Home() {
  const [loading, setLoading] = useState(true);
  const [resourceDocuments, setResourceDocs] = useState([]);
  const [error, setError] = useState(null);
  const [Semester, setSemester] = useState("Semester 1");
  const [Year, setYear] = useState("Year 1");
  useEffect(() => {
    const storageRef = projectDatabase.ref("Courses");
    console.log({ Semester, Year });
    storageRef
      .orderByChild("Year")
      .equalTo(Year)
      .once("value", (snapshot) => {
        let resourceDocs = [];

        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.Semester === Semester) {
            childData = { ...childData, childKey };
            resourceDocs.push(childData);
          }
        });
        setResourceDocs(resourceDocs);

        console.log("fetching finished successfully");
      })
      .then((data) => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Error Occured   \n " + err);
        setLoading(false);
      });
  }, [Semester, Year]);
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setLoading(true);
    setResourceDocs([]);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
    console.log(Year);
  };

  return (
    <div>
      <h1 className="ml-8">Welcome Back</h1>
      <a className="mx-auto" href="/notes">
        Course Material
      </a>
      <div>
        <a className="mx-auto" href="/contact">
          Contact Us
        </a>
      </div>

      <footer
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          color: "white",
          backgroundColor: "lightgray",
          textAlign: "center",
        }}
      >
        <div
          className="div"
          style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
        >
          <a href="http://www.instagram.com" target="blank">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="http://www.twitter.com" target="blank">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="http://www.facebook.com" target="blank">
            <i className="bi bi-facebook"></i>
          </a>
        </div>
        <ul
          className="list-inline"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <li className="list-inline-item">
            <a href="/">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="/notes">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="/contact">Help</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">ACADA © 2021</p>
      </footer>
    </div>
  );
}

export default Home;
