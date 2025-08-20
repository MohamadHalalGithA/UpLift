import React from "react";
import "../footer.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {
  const navigate = useNavigate();

  const ToHome = () => {
  const element = document.getElementById("exercisesPath");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  else {
   navigate("/");
  }
};




  const ToBMI = () => {
    navigate("/calculator");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">UpLift</h2>

        <ul className="footer-links">
         
          <li><button onClick={ToHome} className="footer-link-button">Exercises</button></li>
          <li><button onClick={ToBMI} className="footer-link-button">BMI Calculator</button></li>
        </ul>

        <p className="footer-copy">© {new Date().getFullYear()} UpLift. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
