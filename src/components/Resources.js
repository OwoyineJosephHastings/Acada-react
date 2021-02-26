import React, { useState } from "react";
import { projectDatabase } from "../firebase/config";
function Resources(props) {
  const [downloads, setDownloads] = useState(props.downloads);
  return (
    <div
      className="  "
      style={{ display: "flex", padding: "2%", margin: "1%", Width: "100%" }}
      key={props.uploadedAt}
    >
      <img
        className=""
        width="20%"
        height="20%"
        alt="icon "
        src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
      />
      <div className="">
        <div>
          <h6>{props.name}</h6>
          <p>size: {props.size}Mbs</p>
          <span>{downloads} downloads</span>
        </div>
        <div>
          <a
            href={props.download_link}
            reference={props.reference}
            role="button"
            className="btn btn-outline-success"
            onClick={(event) => {
              event.target.setAttribute("disabled", "disabled");
              projectDatabase
                .ref(event.target.getAttribute("reference"))
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
  );
}

export default Resources;
