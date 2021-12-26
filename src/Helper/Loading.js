import React from "react";

function Loading({ property }) {
  return (
    <div>
      <button className="btn" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm spinner-border border-blue"
          role="status"
          aria-hidden="true"
        ></span>
        {property && <p>Getting {property}</p>}
      </button>
    </div>
  );
}

export default Loading;
