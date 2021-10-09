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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
        .orderByChild("uploadedAt")
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.val();
            resourceDocs.push(childData);
          });
        })
        .then((e) => {
          setResourceDocs(resourceDocs);
          console.log(resourceDocs);
          event.target.removeAttribute("disabled");
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          setResourceDocs(null);
          event.target.removeAttribute("disabled");
          setLoading(false);
        });
    } else {
      setError("Please Select a course from The List");
    }
  }

  return (
    <div className="container ">
      <div>
        <h3>
          <b>Welcome to ACAD-Resources</b>
        </h3>
        <h6>{year + ", " + semester + ", " + courseCode + ", " + resource}</h6>
      </div>
      {resourceDocuments.length !== 0 && (
        <div
          className="container-fluid  "
          style={{ display: "flex", flexWrap: "wrap", padding: "1px" }}
        >
          {resourceDocuments.map(function (res, index) {
            return (
              res.name &&
              res.download_link && <Resources className="container" {...res} />
            );
          })}
        </div>
      )}
      <hr />
      <form className="form ">
        <legend>
          <h4>Select Details</h4>
        </legend>
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Oh Sorry! </strong> {error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={(e) => setError(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {loading && (
          <div
            className="spinner-border text-primary mx-auto"
            role="status"
          ></div>
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
                <option value="EMT1101">
                  EMT1101: Engineering Mathematics I
                </option>
                <option value="TEC1101">
                  TEC1101: Communication Skills for Technology
                </option>{" "}
                <option value="MEC1101">MEC1101: Engineering Drawing</option>
                <option value="MEC1102">
                  MEC1102: Engineering mechanics I
                </option>
                <option value="MEC1103">
                  MEC1103: Electrical Engineering for Mechanical Engineers I
                </option>
              </optgroup>
            )}
            {year === "Year 1" && semester === "Semester 2" && (
              <optgroup label="SEMESTER TWO">
                <option>Select Course</option>
                <option value="EMT1201">
                  EMT1201: Engineering Mathematics II
                </option>
                <option value="EMT1204">
                  EMT1204: Information Communication Technology
                </option>
                <option value="MEC1202">
                  MEC1202: Engineering Mechanics II
                </option>
                <option value="MEC1203">MEC1203: Thermodynamics</option>
                <option value="MEC1204">
                  MEC1204: Mechanics of Materials I
                </option>
              </optgroup>
            )}
            {year === "Year 2" && semester === "Semester 1" && (
              <optgroup label="SEMESTER ONE">
                <option>Select Course</option>
                <option value="EMT2101">
                  EMT2101: Engineering Mathematics III
                </option>
                <option value="TEC2101">
                  TEC2101: Sociology for technologists
                </option>
                <option value="MEC2101">
                  MEC2101: Fluid Mechanics for Mechanical Engineers I
                </option>
                <option value="MEC2102">
                  MEC2102: Mechanics of Materials II
                </option>
                <option value="MEC2103">
                  MEC2103: Computer Aided Design for Mechanical Engineers
                </option>
              </optgroup>
            )}
            {year === "Year 2" && semester === "Semester 2" && (
              <optgroup label="SEMESTER TWO">
                <option>Select Course</option>
                <option value="MEC2201">
                  MEC2201: Electrical Engineering II
                </option>
                <option value="MEC2202">
                  MEC2202: Theory of Machine Elements
                </option>
                <option value="MEC2203">MEC2203: Computer Programming</option>
                <option value="MEC2204">
                  MEC2204: Material Science and Engineering I
                </option>
                <option value="MEC2205">MEC2205: Fluid Mechanics II</option>
              </optgroup>
            )}
            {year === "Year 3" && semester === "Semester 1" && (
              <optgroup label="SEMESTER ONE">
                <option>Select Course</option>
                <option value="MEC3101">
                  MEC3101: Material Science and Engineering II
                </option>
                <option value="MEC3102">MEC3102: Engineering Management</option>
                <option value="MEC3103">
                  MEC3103: Production Engineering I
                </option>
                <option value="MEC3104">
                  MEC3104: Design of Machine Elements
                </option>
                <option value="MEC3105">
                  MEC3105: Dynamic Systems Engineering
                </option>
              </optgroup>
            )}
            {year === "Year 3" && semester === "Semester 2" && (
              <optgroup label="SEMESTER TWO">
                <option>Select Course</option>
                <option value="MEC3201">
                  MEC3201: Maintenance Engineering
                </option>
                <option value="MEC3202">
                  MEC3202: Production Engineering II
                </option>
                <option value="MEC3203">
                  MEC3203: Product Design and Development
                </option>
                <option value="MEC3204">MEC3204: Heat Transfer</option>
                <option value="MEC3205">
                  MEC3205: Control Systems Engineering
                </option>
              </optgroup>
            )}
            {year === "Year 4" && semester === "Semester 1" && (
              <optgroup label="SEMESTER ONE">
                <option>Select Course</option>
                <option value="MEC4101">
                  MEC4101: Business Management for Mechanical Engineers
                </option>
                <option value="MEC4102">MEC4102: Applied Thermodynamics</option>
                <option value="MEC4103">
                  MEC4103: Production Planning and Control
                </option>
                <option value="MEC4104">
                  MEC4104: Mechanical Engineering Project I
                </option>
                <option value="MEC4105">
                  MEC4105: Renewable Energy Technologies (elective)
                </option>
                <option value="MEC4106">
                  MEC4106: Materials Handling (elective)
                </option>
                <option value="MEC4107">
                  MEC4107: Welding Technology (elective)
                </option>
                <option value="MEC4108">
                  MEC4108: Computer Aided Engineering for mechanical Engineers
                </option>
              </optgroup>
            )}
            {year === "Year 4" && semester === "Semester 2" && (
              <optgroup label="SEMESTER TWO">
                <option>Select Course</option>
                <option value="MEC4201">
                  MEC4201: Entrepreneurship for Mechanical Engineers{" "}
                </option>
                <option value="MEC4202">
                  MEC4202: Environmental Engineering
                </option>
                <option value="MEC4203">MEC4203: </option>
                <option value="MEC4204">
                  MEC4204: Mechanical Engineering Project II
                </option>
                <option value="MEC4205">
                  MEC4205: Air Conditioning and Refrigeration (elective)
                </option>
                <option value="MEC4206">
                  MEC4206: Fluid Power systems (elective)
                </option>
                <option value="MEC4207">
                  MEC4207: Operations research and project management for
                  Mechanical Engineers (elective)
                </option>
                <option value="MEC4208">MEC4208: </option>
                <option value="MEC4209">
                  MEC4209: Automotive Engineering (elective)
                </option>
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
            <option>Past Papers</option>
          </select>
        </div>

        <div className="for-group">
          <button
            type="button"
            id="submit"
            className="btn-lg btn-success "
            style={{ minWidth: "10rem", marginBottom: "1rem" }}
            onClick={handleLoadNotes}
          >
            Load
          </button>
        </div>
        <div className="for-group">
          <a
            href="/"
            type="button"
            id="submit"
            className="btn-lg btn-outline-danger "
            style={{ minWidth: "10rem" }}
            onClick={handleLoadNotes}
          >
            cancle
          </a>
        </div>
      </form>
    </div>
  );
};

export default Notes;
