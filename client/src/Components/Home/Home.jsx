import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import fondo from "../../img/t87hr-v9dzx.jpg";
import "./Home.css";
import { getRecipes } from "../../Redux/Actions/Actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  const [page, setPage] = useState(1);
  const [recipePerPage, setRecipePerPage] = useState(9);
  const lastRecipe = page * recipePerPage;
  const firstRecipe = lastRecipe - recipePerPage;
  const currentRecipe = allRecipes?.slice(firstRecipe, lastRecipe);

  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const pagination = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div>
      <div>
        <NavBar setOrder={setOrder} />
      </div>
      {loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
        <>
          <div className="container-card">
            {currentRecipe.length > 0 ? (
              currentRecipe?.map((c) => (
                <Card
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  img={c.img}
                  diets={c.diets}
                  score={c.score}
                  createdInDb={c.createdInDb}
                />
              ))
            ) : (
              <h1>{error}</h1>
            )}
          </div>
          <div>
            <Pagination
              recipePerPage={recipePerPage}
              allRecipes={allRecipes.length}
              pagination={pagination}
            />
          </div>
        </>
      )}
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
