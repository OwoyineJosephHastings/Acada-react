import React, { useState } from "react";
import { projectStorage, projectDatabase, timestamp } from "../firebase/config";
export function Upload() {
  const [state, setState] = useState({
    year: "Year 1",
    semester: "Semester 1",
    courseCode: null,
    resource: "Lecture Notes",
    fileName: null,
  });

  const [progress, setProgress] = useState();

  const { year, semester, courseCode, resource, fileName } = state;
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [alertType, setAlertType] = useState("alert alert-danger");
  const types = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
  ];

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setAlertType("alert alert-danger");

      setError(null);
    } else {
      setAlertType("alert alert-danger");
      setError("File not allowed");
    }
  };
  const UploadResource = (e) => {
    e.preventDefault();

    if (fileName) {
      if (file) {
        if (courseCode) {
          var ref = projectStorage.ref(
            "university/makerere/cedat/school of engineering/mechanical engineering/" +
              year +
              "/" +
              semester +
              "/" +
              courseCode +
              "/" +
              resource +
              "/" +
              file.name
          );

          var uploadTask = ref.put(file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(Math.round(progress));
              switch (snapshot.state) {
                case "RUNNING":
                  // task running
                  console.log(snapshot.state);
                  break;
                default: // do something
              }
            },
            (error) => {
              setAlertType("alert alert-danger");
              setError(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                var promise = projectDatabase
                  .ref(
                    "university/makerere/cedat/school of engineering/mechanical engineering/" +
                      year +
                      "/" +
                      semester +
                      "/" +
                      courseCode +
                      "/" +
                      resource +
                      "/" +
                      fileName
                  )
                  .set({
                    uploadedAt: timestamp,
                    downloads: 0,
                    name: file.name,
                    download_link: downloadURL,
                    reference:
                      "university/makerere/cedat/school of engineering/mechanical engineering/" +
                      year +
                      "/" +
                      semester +
                      "/" +
                      courseCode +
                      "/" +
                      resource +
                      "/" +
                      fileName,
                    size: (Number(file.size) / (1024 * 1024)).toFixed(2),
                  });

                promise.catch((e) => {
                  setAlertType("alert alert-danger");
                  setError(e.message());
                });
                promise.then((e) => {
                  // successful upload to the database
                  // reset the state
                  setProgress(0);
                  setError(null);

                  setState({
                    year: "Year 1",
                    semester: "Semester 1",
                    courseCode: null,
                    resource: "Lecture Notes",
                    fileName: null,
                  });
                  // reset file and error
                  setFile(null);
                  setError(null);
                  console.clear();
                  console.log(
                    "Successfully Uploaded \n Thank you!\n Feel free to share More"
                  );
                });
              });
            }
          );

          setError(null);
        } else {
          setAlertType("alert alert-danger");
          setError("choose a course code from the list");
        }
      } else {
        setAlertType("alert alert-danger");

        setError("Select only allowed file to Upload");
      }
    } else {
      setAlertType("alert alert-danger");

      setError("Please Fill in the file name");
    }
  };

  return (
    <form className="form">
      <fieldset className="fieldset">
        <legend>Specify Resource to Upload</legend>
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
            onClick={(e) => setError(null)}
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
                <option>MEC4108</option>
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

        <div className="form-group">
          <input
            type="text"
            value={fileName}
            name="fileName"
            onChange={handleChange}
            placeholder="Enter File Name"
            className="form-control"
            id="file_name"
            required
          />
        </div>

        <div className="form-group">
          {error && (
            <div class={alertType} role="alert">
              {error}
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            id="file_input"
            className="form-control"
          />
          {file && (
            <div className="progress">
              <div
                id="progress-bar"
                className="progress-bar"
                role="progressbar"
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </div>
          )}
        </div>

        <div className="for-group">
          <p></p>
          <button
            type="submit"
            id="submit"
            className="btn btn-outline-success"
            onClick={UploadResource}
          >
            Upload Resource
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default Upload;
