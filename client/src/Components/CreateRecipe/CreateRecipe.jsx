import React from "react";
import "./CreateRecipe.css";
import fondo from "../../img/CreateRecipe.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
  createRecipe,
  getRecipes,
} from "../../Redux/Actions/Actions";

export default function CreateRecipe() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);
  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  const [input, setInput] = useState({
    name: "",
    img: "",
    diet: [],
    dishType: "",
    summary: "",
    score: "",
    healthScore: "",
    step: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      diet: [...input.diet, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(input));
    const err = validate(input);
    if (Object.values(err).length !== 0) {
      alert("Please, correct the errors so that your recipe is created");
    } else {
      dispatch(createRecipe(input));
      alert("Your recipe is created!");
      setInput({
        name: "",
        img: "",
        diet: [],
        dishType: "",
        summary: "",
        score: "",
        healthScore: "",
        step: "",
      });
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      diet: input.diet.filter((diet) => diet !== e),
    });
  };

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    }
    if (!input.dishType) {
      errors.dishType = "DishType is required";
    }
    if (!input.diet) {
      errors.diet = "Diets is required";
    }
    if (!input.score) {
      errors.score = "Score is required";
    } else if (!/^[0-9]$|^[1-9][0-9]$|^(100)$/.test(input.score)) {
      errors.score = "The score must be between 1 and 100";
    }
    if (!input.healthScore) {
      errors.healthScore = "HealthScore is required";
    } else if (!/^[0-9]$|^[1-9][0-9]$|^(100)$/.test(input.healthScore)) {
      errors.healthScore = "The healthScore must be between 1 and 100";
    }
    if (!input.img) {
      errors.img = "Image is required";
    }
    if (!input.summary) {
      errors.summary = "Summary is required";
    }
    if (!input.step) {
      errors.step = "Step by Step is required";
    }
    return errors;
  };

  return (
    <div>
      <Link to={"/home"}>
        <button className="btn-gohome">Go Home</button>
      </Link>
      <div className="container-form">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="container-input">
            <label className="label">Name: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              className="input-string"
            />
            {error.name && <p className="error">{error.name}</p>}
          </div>
          <div className="container-input">
            <label className="label">DishType: </label>
            <input
              type="text"
              value={input.dishType}
              name="dishType"
              onChange={handleChange}
              className="input-string"
            />
            {error.dishType && <p className="error">{error.dishType}</p>}
          </div>
          <div className="container-input">
            <label className="label">Diets: </label>
            <select onChange={(e) => handleSelect(e)} className="input-string">
              <option hidden>All Diets</option>
              {diets.map((e) => (
                <option value={e.diet} key={e.id}>
                  {e.diet}
                </option>
              ))}
            </select>
            {error.diet && <p className="error">{error.diet}</p>}
          </div>

          <div className="container-input">
            <label className="label">Score: </label>
            <input
              type="number"
              value={input.score}
              name="score"
              onChange={handleChange}
              className="input-score"
            />
            {error.score && <p className="error">{error.score}</p>}
          </div>

          <div className="container-input">
            <label className="label">HealthScore: </label>
            <input
              type="number"
              value={input.healthScore}
              name="healthScore"
              onChange={handleChange}
              className="input-score"
            />
            {error.healthScore && <p className="error">{error.healthScore}</p>}
          </div>
          <div className="container-input">
            <label className="label">Image: </label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={handleChange}
              className="input-text"
            />
            {error.img && <p className="error">{error.img}</p>}
          </div>
          <div className="container-input">
            <label className="label">Summary: </label>
            <input
              type="text"
              value={input.summary}
              name="summary"
              onChange={handleChange}
              className="input-text"
            />
            {error.summary && <p className="error">{error.summary}</p>}
          </div>

          <div className="container-input">
            <label className="label">Step by Step: </label>
            <input
              type="text"
              value={input.step}
              name="step"
              onChange={handleChange}
              className="input-text"
            />
            {error.step && <p className="error">{error.step}</p>}
          </div>
          <div className="btn-container">
            <input
              type="submit"
              value="Create Recipe!"
              className="btn-create"
            ></input>
          </div>
        </form>
        <div className="list-diets">
          <label className="label">List diets: </label>
          {input.diet.map((e) => (
            <div>
              <h1 className="title-diet">
                {e}
                <button onClick={() => handleDelete(e)} className="btn-diet">
                  ❌
                </button>
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
