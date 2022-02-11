import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRecipe from "../Components/CreateRecipe/CreateRecipe.jsx";
import Home from "../Components/Home/Home.jsx";
import RecipeDetail from "../Components/RecipeDetail/RecipeDetail";

const HomeRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/recipe" element={<CreateRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  );
};

export default HomeRouter;
