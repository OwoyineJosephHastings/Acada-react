import React, { useState } from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
  const [course, setCourse] = useState(props.course);
  return (
    <div className="card mx-3" style={{ width: "18rem", margin: "0.5rem" }}>
      <img
        className=""
        src={course.caption}
        alt="course icon"
        width="285rem"
        height="150rem"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{course.name}</h5>
        <p className="card-text">
          <h6>
            {course.university} <br />{" "}
          </h6>

          {"Created: " + course.created_by}
        </p>
        <Link to={"/courses/" + course.childKey} className="btn btn-primary">
          Go To course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
