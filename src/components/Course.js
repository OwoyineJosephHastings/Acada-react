import React, { useEffect, useState } from "react";
import { projectDatabase } from "../firebase/config";
import Loading from "../Helper/Loading";
import Navbar from "./coureses/Navbar";
import Resources from "./Resources";

const Course = (match) => {
  const [loading, setLoading] = useState(true);
  const [resourceDocuments, setResourceDocs] = useState([]);
  const [error, setError] = useState(null);
  const [LectureNotes, setLectureNotes] = useState([]);
  useEffect(() => {
    const id = match.match.params.id;

    const fetchData = () => {
      let resourceDocs = [];
      const storageRef = projectDatabase.ref("Courses");

      storageRef
        .orderByKey()
        .equalTo(id)
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.val();
            resourceDocs.push(childData);
          });
          setResourceDocs(resourceDocs);
        })
        .then((data) => {
          console.log(resourceDocs);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          setError("Error Occured   \n " + err);
          setLoading(false);
        });
    };
    fetchData();

    return () => {};
  }, [match]);

  return (
    <div className="container">
      <div className="jumbotron text-center mx-auto pl-3">
        <h3 style={{ display: "flex", flexWrap: "wrap" }}>
          {loading && <Loading property="Course Name" />}
          {resourceDocuments.length !== 0 && resourceDocuments[0].name}
        </h3>
        <h3>ON ACADA</h3>
      </div>
      <Navbar />
      <div className="container" style={{ marginTop: "10px" }}>
        <div className="row">
          <div className="col-sm-4 shadow-md p-3 mb-3 bg-white rounded">
            <h6>
              Author:{"  "}
              {resourceDocuments.length
                ? resourceDocuments[0].created_by
                : "..."}
            </h6>
            {/* <h5>Profile</h5>
            <div className="fakeimg">Image</div>
            <p>
              Some text about me in culpa qui officia deserunt mollit anim..
            </p> */}
            {/* <h3>Some Links</h3>
            <p>Lorem ipsum dolor sit ame.</p> */}
            <ul className="nav nav-pill flex-column">
              <li className="nav-item">
                <a className="nav-link " href="#list-item-1">
                  Lecture Notes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#list-item-2">
                  Past Papers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#list-item-3">
                  Assignments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#list-item-4">
                  Tests
                </a>
              </li>
              <li>
                "The way you learn anything is that something fails, and you
                figure out how not to have it fail again."
              </li>
            </ul>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-8 shadow-lg p-3 mb-3  bg-white rounded">
            <h2>
              {resourceDocuments.length
                ? resourceDocuments[0].name
                : "course name"}
            </h2>
            <h5>
              Created:
              {loading && <Loading property="" />}
              {resourceDocuments.length
                ? " " + resourceDocuments[0].created_at
                : "..."}
            </h5>
            <div className="fakeimg" style={{ width: "20rem" }}>
              {/* <img
                className="card-img-top"
                src={
                  resourceDocuments.length ? resourceDocuments[0].caption : ""
                }
                alt={
                  resourceDocuments.length
                    ? resourceDocuments[0].name + " image caption"
                    : "course image caption"
                }
              /> */}
            </div>

            <div
              className="accordion"
              id="accordionExample"
              style={{ marginBottom: "1rem" }}
            >
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h6 className="text-center">Course description</h6>
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse "
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    {resourceDocuments.length !== 0 &&
                      resourceDocuments[0].description}
                    {loading && <Loading property="Description" />}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <h6>Course Materials</h6>
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    <div id="list-example" className="list-group">
                      <a
                        className="list-group-item list-group-item-action"
                        href="#list-item-1"
                      >
                        Lecture Notes
                      </a>
                      <a
                        className="list-group-item list-group-item-action"
                        href="#list-item-2"
                      >
                        Past Papers
                      </a>
                      <a
                        className="list-group-item list-group-item-action"
                        href="#list-item-3"
                      >
                        Assignments
                      </a>
                      <a
                        className="list-group-item list-group-item-action"
                        href="#list-item-4"
                      >
                        Tests
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-spy="scroll"
              data-target="#list-example"
              data-offset={0}
              className="scrollspy-example"
            >
              <h4 id="list-item-1">Lecture Notes </h4>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "3px",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
              >
                {loading && <Loading property="Lecture Notes" />}
                {resourceDocuments.length
                  ? Object.entries(
                      resourceDocuments[0].Resources.lecture_notes
                    ).map((key) => {
                      return <Resources className="container" {...key[1]} />;
                    })
                  : "..."}
              </div>

              <h4 id="list-item-2"> Past Papers</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "3px",
                }}
              >
                {loading && <Loading property="Past Papers" />}
                {resourceDocuments.length
                  ? Object.entries(
                      resourceDocuments[0].Resources.past_papers
                    ).map((key) => {
                      return <Resources className="container" {...key[1]} />;
                    })
                  : "..."}
              </div>
              <h4 id="list-item-3">Assignments</h4>
              <p>...</p>
              <h4 id="list-item-4">Tests</h4>
              <p />
              <h5>
                <a href="/">Download Open book test solutions 2020 pdf </a>
              </h5>
              <p />
            </div>
            <p>INSPIRATION</p>
            <p>
              1. “Strive for perfection in everything you do. Take the best that
              exists and make it better. When it does not exist, design it.”
              2.The way you learn anything is that something fails, and you
              figure out how not to have it fail again.
            </p>
          </div>
        </div>
      </div>
      <div className="jumbotron text-center" style={{ marginBottom: 0 }}>
        <p>Footer</p>
      </div>
    </div>
  );
};

export default Course;
