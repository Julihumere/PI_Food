import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
export default function Card({ name, img, diets, score, createdInDb, id }) {
  return (
    <>
      <div>
        <div className="card">
          <div className="card-header">
            <img
              src={img}
              className="card-img-top"
              width="300"
              height="300"
              alt=""
            />
          </div>
          <div className="card-container">
            <div className="info">{name}</div>
            <div className="info enlarge">
              <h4>
                Diets:{" "}
                {createdInDb
                  ? diets.map((e) => e.diet).join(", ")
                  : diets.join(", ")}
              </h4>
              <h4>Score: {score}</h4>
            </div>
          </div>
          <div className="card-actions">
            <Link to={`/recipes/${id}`}>
              <button className="btn-detai">Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
