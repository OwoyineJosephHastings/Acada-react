import React, { useRef, useState } from "react";
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
  var NotesYear = useRef(null);
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
                    academicYear: NotesYear.current.value,
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
    <form className="form ">
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
          <input
            type="text"
            placeholder="Academic Year"
            required
            ref={NotesYear}
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
        <div class="input-group mb-3">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="inputGroupFile02"
              onChange={handleFileChange}
            />
            <label className="custom-file-label" for="inputGroupFile02">
              Choose file
            </label>
          </div>
          <div className="input-group-append">
            <span
              className="btn btn-outline-success input-group-text"
              id=""
              onClick={UploadResource}
            >
              Upload
            </span>
          </div>
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
