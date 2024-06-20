import React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "./css/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  const email = "chitresh.cm@gamil.com";
  const location=useLocation();
  const footerElements = document.getElementsByClassName("footer-outer");

  useEffect(() => {       // Check if the current path is the login route
    if (location.pathname === '/login') {
      document.body.style.overflow = 'hidden';
      footerElements[0].style.position = "absolute";
    } else {
        document.body.style.overflow = 'auto';
        footerElements[0].style.position = "static";
    }
  }, [location.pathname]);
  return (
    <div class="card footer-outer">
      <div class="card-header footer">
        <Link to={`mailto:${email}`} className="footer-text">
          <a>chitresh.cm@gmail.com</a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
