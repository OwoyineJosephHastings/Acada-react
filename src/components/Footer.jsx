import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div
        className="div my-2"
        style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
      >
        <a href="http://www.instagram.com" target="blank">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="http://www.twitter.com" target="blank">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="http://www.facebook.com" target="blank">
          <i className="bi bi-facebook"></i>
        </a>
      </div>

      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="/">Home</a>
        </li>
        <li className="list-inline-item">
          <a href="/notes">Services</a>
        </li>
        <li className="list-inline-item">
          <a href="/contact">Help</a>
        </li>
        <li className="list-inline-item">
          <a href="/">Terms</a>
        </li>
        <li className="list-inline-item">
          <a href="/">Privacy Policy</a>
        </li>
      </ul>
      <p className="copyright">ACADA © 2021</p>
    </footer>
  );
}
