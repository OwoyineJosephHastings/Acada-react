import React from "react";
import Loading from "../Helper/Loading";
import useCourse from "../hooks/useCourse";
import CourseSideBar from "./CourseSidebar";
import Resources from "./Resources";

const Course = match => {
  const id = match.match.params.id;
  const { data: document, isLoading: loading, isError } = useCourse(id);

  if (loading) {
    return <Loading property=" course detail" />;
  }

  if (isError || !document) {
    return (
      <div className="alert lert-danger">
        <h5 className="alert-heading">Error fetching course</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 ml-2">
      <h2>{document.name}</h2>
      <div style={{ marginTop: "10px" }}>
        <div className="row" id="course-container">
          <div className="col-sm-9 card p-4 mb-3 bg-white rounded">
            <h5>Created: {document.created_at}</h5>
            <h6>Author: {document.created_by}</h6>
            <div className="mb-3">
              <small>
                &ldquo; The way you learn anything is that something fails, and you figure out how
                not to have it fail again.&rdquo;
              </small>
            </div>

            <div className="course-detail">
              <h4 id="list-item-1">Lecture Notes </h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "3px",
                  marginBottom: "2rem",
                }}
              >
                {Object.entries(document.Resources.lecture_notes).map(key => {
                  return <Resources className="container" {...key[1]} />;
                })}
              </div>

              <h4 id="list-item-2"> Past Papers</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "3px",
                }}
              >
                {Object.entries(document.Resources.past_papers).map(key => {
                  return <Resources className="container" {...key[1]} />;
                })}
              </div>
            </div>
          </div>
          <CourseSideBar author={document.created_by} description={document.description} />
        </div>
      </div>
    </div>
  );
};

export default Course;
