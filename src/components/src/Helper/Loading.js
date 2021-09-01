import React from "react";

function Loading(props) {
  return (
    <div>
      <button className="btn " type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Getting {props.property}
      </button>
    </div>
  );
}

export default Loading;
