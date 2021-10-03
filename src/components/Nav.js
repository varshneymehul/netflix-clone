import React, { useEffect, useState } from "react";

import "./stylesheets/Nav.css";
import logo from "../assets/images/netflix-logo.png";
import avatar from "../assets/images/netflix-avatar.png";
function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="netflix-logo" />

      <img className="nav__avatar" src={avatar} alt="avatar" />
    </div>
  );
}

export default Nav;
