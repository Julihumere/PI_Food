import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../Redux/Actions/Actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipesByName(name));
  };
  return (
    <div className="container-searchBar">
      <input
        onChange={(e) => handleInput(e)}
        type="text"
        placeholder="Recipes..."
        className="input-searchBar"
      />
      <button
        className="btn-searchBar"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        🔍
      </button>
    </div>
  );
}
