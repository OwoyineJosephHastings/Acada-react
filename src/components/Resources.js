import React from "react";
function Resources(props) {
  return (
    <div
      className="row bg-light w-50 sm-w-100 border border-white "
      id="resource"
      style={{ display: "flex", padding: "1px" }}
    >
      <img
        className="col-3"
        width="80%"
        height="90%"
        alt="icon "
        src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
      />
      <div className="col-9">
        <div>
          <h6>{props.name}</h6>
          <p>Description </p>
          <span>{props.downloads} downloads</span>
        </div>
        <div>
          <a
            href={props.download_link}
            role="button"
            className="btn btn-outline-success"
            onClick={(e) => {
              console.log(e.target.getAttribute("href"));
            }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default Resources;
