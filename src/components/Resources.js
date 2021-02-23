import React from "react";

function Resources(props) {
  return (
    <div>
      <div>
        <img src="D:\Projects\htmlProjects\SSN\resorces\images\PDF_file_icon.svg" />
        <div>
          <h6>Title</h6>
          <p>lorem discription </p>
          <span>100 downloads</span>
        </div>
        <div>
          <a href="/" role="button" className="btn btn-outline-primary">
            Download{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Resources;
