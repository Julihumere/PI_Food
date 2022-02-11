import React from "react";
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
    let objError = validate({
      ...input,
      [name]: value,
    });
    setError(objError);
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      diet: [...input.diet, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe(input));
    alert("Se creo tu receta!");
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
  };

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    }
    if (!input.img) {
      errors.img = "Image is required";
    }
    if (!input.diet) {
      errors.diet = "Diets is required";
    }
    if (!input.dishType) {
      errors.dishType = "dishType is required";
    }
    if (!input.summary) {
      errors.summary = "Summary is required";
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
    if (!input.step) {
      errors.step = "Step by Step is required";
    }
    return errors;
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      diet: input.diet.filter((diet) => diet !== e),
    });
  };

  return (
    <div>
      <Link to={"/home"}>
        <button>Go Home</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={handleChange}
          />
          {error.img && <p>{error.img}</p>}
        </div>
        <div>
          <label>Diets: </label>
          <select onChange={(e) => handleSelect(e)}>
            <option hidden>All Diets</option>
            {diets.map((e) => (
              <option value={e.diet} key={e.id}>
                {e.diet}
              </option>
            ))}
          </select>
          {error.diet && <p>{error.diet}</p>}
        </div>
        <div>
          <label>DishType: </label>
          <input
            type="text"
            value={input.dishType}
            name="dishType"
            onChange={handleChange}
          />
          {error.dishType && <p>{error.dishtypes}</p>}
        </div>
        <div>
          <label>Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={handleChange}
          />
          {error.summary && <p>{error.summary}</p>}
        </div>
        <div>
          <label>Score: </label>
          <input
            type="number"
            min="1"
            max="100"
            value={input.score}
            name="score"
            onChange={handleChange}
          />
        </div>
        {error.score && <p>{error.score}</p>}
        <div>
          <label>HealthScore: </label>
          <input
            type="number"
            min="1"
            max="100"
            value={input.healthScore}
            name="healthScore"
            onChange={handleChange}
          />
        </div>
        {error.healthScore && <p>{error.healthScore}</p>}
        <div>
          <label>Step by Step: </label>
          <input
            type="text"
            value={input.step}
            name="step"
            onChange={handleChange}
          />
          {error.step && <p>{error.step}</p>}
        </div>
        <input type="submit" value="Create Recipe!"></input>
      </form>
      <div>
        {input.diet.map((e) => (
          <div>
            <h3>
              {e}
              <button onClick={() => handleDelete(e)}>x</button>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
