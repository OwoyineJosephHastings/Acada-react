import React, { useRef, useState } from "react";
import { projectDatabase, timestamp } from "../firebase/config";

function Contact() {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const SubjectRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      nameRef.current.value &&
      emailRef.current.value &&
      messageRef.current.value &&
      SubjectRef.current.value
    ) {
      setError(null);
      var promise = projectDatabase
        .ref("university/makerere/cedat/school of engineering/contacts")
        .push({
          uploadedAt: timestamp,
          Username: nameRef.current.value,
          email: emailRef.current.value,
          Message: messageRef.current.value,
          Subject: SubjectRef.current.value,
        });
      promise.then((e) => {
        setLoading(false);
        alert("Thank you for contacting us!, \n We will back get to you ASAP");
      });
      promise.catch((err) => {
        setError(err);
        setLoading(false);
      });
    } else {
      setError("All fields are required");
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <a href="/">
        <h1 className=" h1 mx-auto"> {"<"}Home</h1>
      </a>
      <form>
        <fieldset>
          <legend>User Info</legend>

          {loading && (
            <div
              class="spinner-border text-primary mx-auto"
              role="status"
            ></div>
          )}
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show mx-auto"
              role="alert"
            >
              <strong>Oh Sorry! </strong> {error}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={(e) => setError(null)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              ref={nameRef}
              id="name"
              required
              placeholder=" Surname FirstName"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              name="email"
              ref={emailRef}
              type="email"
              id="email"
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="Subject">Subject:</label>
            <input
              className="form-control"
              name="Subject"
              ref={SubjectRef}
              type="text"
              id="email"
              required
              placeholder="eg. Need some resources, or failed to download etc "
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              ref={messageRef}
              className="form-control"
              required
              placeholder="Describe your complain fully here"
            />
          </div>
          <button
            className="form-control btn-outline-success"
            type="button"
            onClick={handleSubmit}
            style={{ maxWidth: "15rem" }}
          >
            submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Contact;
