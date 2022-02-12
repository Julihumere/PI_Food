import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
export default function Card({ name, img, diets, score, createdInDb, id }) {
  return (
    <>
      <div className="contenedor">
        <div className="card">
          <div className="card-encabezado">
            <img
              src={img}
              className="card-img-top"
              width="300"
              height="300"
              alt=""
            />
          </div>
          <div className="card-container">
            <div className="info desplazar">{name}</div>
            <div className="info desplazar">
              <h4>
                Diets:{" "}
                {createdInDb
                  ? diets.map((e) => e.diet).join(", ")
                  : diets.join(", ")}
              </h4>
            </div>
            <div className="info desplazar">Score: {score}</div>
          </div>
          <div className="card-acciones">
            <Link to={`/recipes/${id}`}>
              <button className="button">Detalles</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
