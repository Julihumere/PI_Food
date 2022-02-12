import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../img/restaurante2.jpg";
import { getDetail } from "../../Redux/Actions/Actions";
import "./RecipeDetail.css";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  const myRecipe = useSelector((state) => state.detail);
  const [loading, setLoading] = useState(true);

  return (
    <div className="detail">
      {myRecipe.length > 0 ? (
        <div className="detail-container">
          <div>
            <h1 className="title-detail">{myRecipe[0].name}</h1>
            <img src={myRecipe[0].img} alt="" className="img-detail" />
            <h2 className="score-detail">
              ⭐ Health Score: {myRecipe[0].healthScore} - ⭐ Score:{" "}
              {myRecipe[0].score}
            </h2>
            <h2 className="diet-detail">
              {" "}
              🥗 🥩 🥣 Diets:{" "}
              {myRecipe[0].createdInDb
                ? myRecipe[0].diets.map((e) => e.diet).join(", ")
                : myRecipe[0].diets.join(", ")}
            </h2>
            <h2 className="dishType-detail">
              🍽️ DishType:{" "}
              {!myRecipe[0].createdInDb
                ? myRecipe[0].dishType.map((e) => e).join(", ")
                : myRecipe[0].dishType}
            </h2>
            <h3 className="summary-detail">
              Summary: {myRecipe[0].summary.replace(/<[^>]*>?/g, "")}
            </h3>
            <h3 className="step-detail">
              Step by Step:{" "}
              {!myRecipe[0].createdInDb
                ? myRecipe[0].step.map((e) => e)
                : myRecipe[0].step}
            </h3>
            <div className="container-btn">
              <Link to={"/home"}>
                <button className="btn-detail">Go Back</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading setLoading={setLoading} />
      )}

      <div className="fondo">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
