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
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
      </style>

      <Navbar />
      <div className="container" style={{ marginTop: "10px" }}>
        <h2>
          {resourceDocuments.length ? (
            resourceDocuments[0].name
          ) : (
            <Loading property="Course name" />
          )}
        </h2>
        <div className="row">
          <div className="col-sm-4  p-3 pr-3 bg-white rounded">
            <h6>
              Author:{"  "}
              {resourceDocuments.length
                ? resourceDocuments[0].created_by
                : "..."}
            </h6>

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
                className="collapse show"
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
                      className="list-group-item list-group-item-action disabled"
                      href="#list-item-3"
                    >
                      Assignments (coming soon)
                    </a>
                    <a
                      className="list-group-item list-group-item-action"
                      href="#list-item-4"
                    >
                      Tests (coming soon)
                    </a>
                  </div>
                </div>
              </div>
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
            </div>

            <ul className="nav nav-pill flex-column"></ul>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-8 shadow-sm p-3 mb-3  bg-white rounded">
            <h5>
              Created:
              {loading && <Loading property="Date of Creation" />}
              {resourceDocuments.length
                ? " " + resourceDocuments[0].created_at
                : "..."}
            </h5>

            <div
              data-spy="scroll"
              data-target="#list-example"
              data-offset={0}
              className="scrollspy-example"
            >
              <h4 id="list-item-1">Lecture Notes </h4>
              <div
                style={{
                  padding: "30px",
                  margin: "20px",
                  boxShadow: "5px 5px 5px 5px",
                  fontFamily: "Indie Flower",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                <p>
                  "The way you learn anything is that something fails, and you
                  figure out how not to have it fail again."
                </p>
              </div>

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
              <h4 id="list-item-3">Inspiration</h4>
            </div>
            <div
              style={{
                padding: "30px",
                margin: "20px",
                boxShadow: "5px 5px 5px 5px",
                fontFamily: "Indie Flower",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              <p>
                "The way you learn anything is that something fails, and you
                figure out how not to have it fail again."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
