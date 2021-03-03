import React, { useState } from "react";
import { projectDatabase } from "../firebase/config";
import PDF_file_icon from "../statics/PDF_file_icon.svg";
function Resources(props) {
  const [downloads, setDownloads] = useState(props.downloads);

  return (
    <div className="card bg-light" style={{ width: "500px", margin: "1%" }}>
      <div className="row no-gutters">
        <div className="col-md-2">
          <img
            className="card-img"
            src={PDF_file_icon}
            alt="resource icon"
            width="100px"
            height="70rem"
          />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">
              Downloads: {downloads} <br /> Download size: {props.size} Mbs{" "}
              <br />
              Academic Year: {props.academicYear}
            </p>
            <a
              href={props.download_link}
              className="btn btn-outline-success"
              onClick={(event) => {
                event.target.setAttribute("disabled", "disabled");
                projectDatabase
                  .ref(props.reference)
                  .update({ downloads: Number(downloads) + 1 })
                  .then((e) => {
                    setDownloads(Number(downloads) + 1);
                    event.target.setAttribute("disabled", false);
                  });
              }}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
