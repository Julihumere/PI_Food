import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";
import {
  filterByDiets,
  filterByLetter,
  filterByScore,
  getRecipes,
} from "../../Redux/Actions/Actions";

export default function NavBar({ setOrder }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
  };

  const handleFilterDiets = (e) => {
    dispatch(filterByDiets(e.target.value));
  };

  const handleFilterLetter = (e) => {
    e.preventDefault();
    dispatch(filterByLetter(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handleFilterScore = (e) => {
    e.preventDefault();
    dispatch(filterByScore(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="top">
          <h1 className="title-navbar">Foodies</h1>
          <Link to={"/recipe"} className="btn-link">
            <button className="btn-crear-navbar">Create a new Recipe</button>
          </Link>
        </div>

        <div className="filter">
          <div>
            <label className="label-nav">Order by Letter: </label>
            <select
              className="select-navbar"
              onChange={(e) => handleFilterLetter(e)}
            >
              <option hidden>Alphabetic</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
          <div>
            <label className="label-nav">Order by Score: </label>
            <select
              className="select-navbar"
              onChange={(e) => handleFilterScore(e)}
            >
              <option hidden>Score</option>
              <option value="asc">1 - 100</option>
              <option value="desc">100 - 1</option>
            </select>
          </div>
          <div>
            <label className="label-nav">Order by Diets: </label>
            <select
              className="select-navbar"
              onChange={(e) => handleFilterDiets(e)}
            >
              <option hidden>Diets</option>
              <option value="All">All</option>
              <option value="gluten free">Gluten Free</option>
              <option value="dairy free">Dairy Free</option>
              <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="paleolithic">Paleolithic</option>
              <option value="primal">Primal</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="fodmap friendly">Fodmap Friendly</option>
              <option value="whole 30">Whole 30</option>
              <option value="ketogenic">Ketogenic</option>
            </select>
          </div>
          <div className="btn-container">
            <button className="btn-refresh" onClick={(e) => handleClick(e)}>
              🔁
            </button>
          </div>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}
