import React from "react";
import { useState } from "react";

import { projectDatabase } from "../firebase/config";
import Resources from "./Resources";

const Notes = () => {
  const [state, setState] = useState({
    year: "Year 1",
    semester: "Semester 1",
    courseCode: "",
    resource: "Lecture Notes",
  });
  const [resourceDocuments, setResourceDocs] = useState([]);
  const { year, semester, courseCode, resource } = state;
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  function handleLoadNotes(event) {
    if (courseCode !== "" && courseCode !== "Select Course") {
      event.preventDefault();
      event.target.setAttribute("disabled", true);

      const storageRef = projectDatabase.ref(
        "university/makerere/cedat/school of engineering/mechanical engineering/" +
          year +
          "/" +
          semester +
          "/" +
          courseCode +
          "/" +
          resource
      );
      let resourceDocs = [];
      storageRef
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            resourceDocs.push(childData, childKey);
          });
        })
        .then((e) => {
          setResourceDocs(resourceDocs);
          event.target.removeAttribute("disabled");
          setError(null);
        })
        .catch((e) => {
          setResourceDocs(null);
          event.target.removeAttribute("disabled");
        });
    } else {
      setError("Please Select a course from The List");
    }
  }

  return (
    <div className="container">
      <div>
        <h3>
          <b>Welcome to ACAD-Resources</b>
        </h3>
        <h6>{year + ", " + semester + ", " + courseCode + ", " + resource}</h6>
      </div>
      {resourceDocuments.length !== 0 && (
        <div
          className="container-fluid  sm-100"
          style={{ display: "flex", flexWrap: "wrap", padding: "1px" }}
        >
          {resourceDocuments.map(function (res, index) {
            return (
              res.name && res.download_link && <Resources class="" {...res} />
            );
          })}
        </div>
      )}
      <hr />
      <form>
        <fieldset className="fieldset">
          <legend>Choose Specific Notes</legend>
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
            <label htmlFor="year">Year</label>
            <select
              name="year"
              onChange={handleChange}
              value={year}
              id="year"
              className="form-control"
            >
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select
              name="semester"
              onChange={handleChange}
              value={semester}
              id="semester"
              className="form-control"
            >
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>
          </div>

          <div className="for-group">
            <label htmlFor="courseCode">Course Code:</label>
            <select
              name="courseCode"
              value={courseCode}
              onChange={handleChange}
              className="form-control"
              id="courseCode"
            >
              {year === "Year 1" && semester === "Semester 1" && (
                <optgroup label="SEMESTER ONE">
                  <option>Select Course</option>
                  <option>EMT1101</option>
                  <option>TEC1101</option>
                  <option>MEC1101</option>
                  <option>MEC1102</option>
                  <option>MEC1103</option>
                </optgroup>
              )}
              {year === "Year 1" && semester === "Semester 2" && (
                <optgroup label="SEMESTER TWO">
                  <option>Select Course</option>
                  <option>EMT1201</option>
                  <option>EMT1204</option>
                  <option>MEC1202</option>
                  <option>MEC1203</option>
                  <option>MEC1204</option>
                </optgroup>
              )}
              {year === "Year 2" && semester === "Semester 1" && (
                <optgroup label="SEMESTER ONE">
                  <option>Select Course</option>
                  <option>EMT2101</option>
                  <option>TEC2101</option>
                  <option>MEC2101</option>
                  <option>MEC2102</option>
                  <option>MEC2103</option>
                </optgroup>
              )}
              {year === "Year 2" && semester === "Semester 2" && (
                <optgroup label="SEMESTER TWO">
                  <option>Select Course</option>
                  <option>MEC2201</option>
                  <option>MEC2202</option>
                  <option>MEC2203</option>
                  <option>MEC2204</option>
                  <option>MEC2205</option>
                </optgroup>
              )}
              {year === "Year 3" && semester === "Semester 1" && (
                <optgroup label="SEMESTER ONE">
                  <option>Select Course</option>
                  <option>MEC3101</option>
                  <option>MEC3102</option>
                  <option>MEC3103</option>
                  <option>MEC3104</option>
                  <option>MEC3105</option>
                </optgroup>
              )}
              {year === "Year 3" && semester === "Semester 2" && (
                <optgroup label="SEMESTER TWO">
                  <option>Select Course</option>
                  <option>MEC3201</option>
                  <option>MEC3202</option>
                  <option>MEC3203</option>
                  <option>MEC3204</option>
                  <option>MEC3205</option>
                </optgroup>
              )}
              {year === "Year 4" && semester === "Semester 1" && (
                <optgroup label="SEMESTER ONE">
                  <option>Select Course</option>
                  <option>MEC4101</option>
                  <option>MEC4102</option>
                  <option>MEC4103</option>
                  <option>MEC4104</option>
                  <option>MEC4105</option>
                  <option>MEC4106</option>
                  <option>MEC4107</option>
                </optgroup>
              )}
              {year === "Year 4" && semester === "Semester 2" && (
                <optgroup label="SEMESTER TWO">
                  <option>Select Course</option>
                  <option>MEC4201</option>
                  <option>MEC4202</option>
                  <option>MEC4203</option>
                  <option>MEC4204</option>
                  <option>MEC4205</option>
                  <option>MEC4206</option>
                  <option>MEC4207</option>
                  <option>MEC4208</option>
                  <option>MEC4209</option>
                </optgroup>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="resourceType">Resources Type</label>
            <select
              name="resource"
              value={resource}
              onChange={handleChange}
              id="resourceType"
              className="form-control"
            >
              <option>Lecture Notes</option>
              <option>Tests</option>
              <option>Assignments</option>
              <option>Project Reports</option>
            </select>
          </div>

          <div className="for-group">
            <button
              type="button"
              id="submit"
              className="btn-lg btn-primary "
              style={{ minWidth: "10rem" }}
              onClick={handleLoadNotes}
            >
              Load
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Notes;
