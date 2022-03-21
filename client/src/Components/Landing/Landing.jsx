import React from "react";
import "./Landing.css";
import fondo from "../../img/Carne.mp4";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="global">
      <div className="content-title">
        <h1 className="title">Welcome to Foodies</h1>
      </div>
      <div className="content-paragraph">
        <p>
          Foodies is a page where you can find different recipes with their
          details
        </p>
      </div>
      <div className="content-button">
        <Link to={"/home"}>
          <button className="button-Link">Enter</button>
        </Link>
      </div>
      <div>
        <video className="videoLanding" autoPlay loop muted>
          <source src={fondo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
