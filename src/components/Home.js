import React from "react";
import { useState } from "react";
import Loading from "../Helper/Loading";
import useCourses from "../hooks/useCourses";
import CourseCard from "./CourseCard";

const yearOptions = [
  {
    label: "Year 1",
    disabled: true,
  },
  {
    label: "Year 2",
    disabled: false,
  },
  {
    label: "Year 3",
    disabled: false,
  },
  {
    label: "Year 4",
    disabled: false,
  },
];

const semesterOptions = [
  {
    label: "Semester 1",
    disabled: true,
  },
  {
    label: "Semester 2",
    disabled: false,
  },
];

function Home() {
  const [Semester, setSemester] = useState("Semester 2");
  const [Year, setYear] = useState("Year 2");
  const { courses, loading, error } = useCourses({ Semester, Year });

  const handleSemesterChange = e => {
    console.log(e.target.value);
    setSemester(e.target.value);
  };

  const changeYear = e => {
    console.log(e.target.value);
    setYear(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="course-selection">
        <fieldset className="years">
          <div className="rounded border border-secondary p-2 bg-white">
            <h5 className="mx-3">Select Year</h5>
            <div className="year-selection">
              {yearOptions.map(yearOption => (
                <div className="form-check" key={yearOption.label}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={yearOption.label}
                    name="year"
                    defaultChecked={yearOption.label === Year}
                    value={yearOption.label}
                    onChange={changeYear}
                    disabled={yearOption.disabled}
                  />

                  <label className="form-check-label nowrap" htmlFor={yearOption.label}>
                    {yearOption.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="semesters">
          <div className="rounded border border-secondary p-2 bg-white">
            <h5 className="mx-3">Semester</h5>
            <div className="d-flex" style={{ gap: 16, flexWrap: "wrap" }}>
              {semesterOptions.map(sem => (
                <div className="form-check" key={sem.label}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={sem.label}
                    name="semester"
                    defaultChecked={sem.label === Semester}
                    value={sem.label}
                    onChange={handleSemesterChange}
                    disabled={sem.disabled}
                  />
                  <label className="form-check-label nowrap" htmlFor={sem.label}>
                    {sem.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
      </div>

      <a href="/notes" className="ml-4 my-2 d-inline-block">
        More Courses
      </a>
      {courses && courses.length > 0 && <h4 className="ml-4 mt-2">Courses</h4>}
      {loading && <Loading property=" Acada Courses" />}
      <div>
        {courses.length === 0 && !loading && (
          <div className="alert alert-danger" role="alert">
            <p>
              No results for your{" "}
              <strong>
                {Year} {Semester}
              </strong>
            </p>

            <p>
              More course are being uploaded soon. We appologise for any inconviniences, click
              <a href="/notes" className="d-inline-block mx-1">
                <span>here</span>
              </a>
              for more courses
            </p>
          </div>
        )}

        {error && <div>Some error occured</div>}
        {courses && (
          <div className="d-flex flex-wrap ">
            {courses.map(course => {
              return <CourseCard course={course} key={course.childKey} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
