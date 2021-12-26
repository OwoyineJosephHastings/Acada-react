import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <Link
      to={"/courses/" + course.childKey}
      className="card mx-3 download-card"
      style={{ width: "18rem", margin: "0.5rem" }}
    >
      <div style={{ overflow: "hidden" }}>
        <img
          className="zoom"
          loading="lazy"
          src={course.caption}
          alt="course icon"
          width="285rem"
          height="150rem"
        ></img>
      </div>
      <div className="card-body">
        <h5 className="card-title">{course.name}</h5>
        <div className="card-text">
          <h6>{course.university}</h6>
          <h6>{"Created: " + course.created_by}</h6>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
