import React from "react";

export default function CourseSideBar({ description }) {
  return (
    <div className="col-sm-3">
      <div className="accordion" id="accordionExample" style={{ marginBottom: "1rem" }}>
        <div className="card">
          <div
            className="card-header pointer"
            id="headingOne"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Course description
          </div>

          <div
            id="collapseOne"
            className="collapse "
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">{description}</div>
          </div>
        </div>
        <div className="card">
          <div
            className="card-header pointer"
            id="headingTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Course Materials
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div id="list-example" className="list-group">
                <a className="list-group-item list-group-item-action" href="#list-item-1">
                  Lecture Notes
                </a>
                <a className="list-group-item list-group-item-action" href="#list-item-2">
                  Past Papers
                </a>
                <a className="list-group-item list-group-item-action disabled" href="#list-item-3">
                  Assignments (coming soon)
                </a>
                <a className="list-group-item list-group-item-action" href="#list-item-4">
                  Tests (coming soon)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
