import React from "react";
import "./Landing.css";
import fondo from "../../img/Carne.mp4";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="global">
      <div className="content-title">
        <h1 className="title">Bienvenidos a Foodies</h1>
      </div>
      <div className="content-paragraph">
        <p>
          Foodies es una pagina donde podras encontrar distintas recetas con sus
          detalles
        </p>
      </div>
      <div className="content-button">
        <Link to={"/home"}>
          <button className="button-Link">Ingresar</button>
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
