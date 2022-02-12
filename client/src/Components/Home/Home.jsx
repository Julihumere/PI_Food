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

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  const [page, setPage] = useState(1); //inicio en la primera pagina
  const [recipePerPage, setRecipePerPage] = useState(9); //cuantas recetas muestro por pagina
  const lastRecipe = page * recipePerPage; // 1 * 9 = 9
  const firstRecipe = lastRecipe - recipePerPage; // 9 - 9 = 0
  const currentRecipe = allRecipes.slice(firstRecipe, lastRecipe); //corto del indice de la primera receta hasta la ultima receta, es decir, mi pagina va a ser de 0 a 9 (corta 9 elementos pero al ser un array son 8 indices)
  // Page 1 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // Page 2 = [9, 10, 11, 12 ,13, 14, 15, 16]
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
            {currentRecipe &&
              currentRecipe.map((c) => (
                <Card
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  img={c.img}
                  diets={c.diets}
                  score={c.score}
                  createdInDb={c.createdInDb}
                />
              ))}
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
