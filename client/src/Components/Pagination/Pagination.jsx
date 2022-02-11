import React from "react";
import "./Pagination.css";

export default function Pagination({ recipePerPage, allRecipes, pagination }) {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipePerPage); i++) {
    pageNum.push(i);
  }

  return (
    <div className="container-pagination">
      {pageNum &&
        pageNum.map((e) => (
          <span key={e} className="pagination">
            <button className="a" onClick={() => pagination(e)}>
              {e}
            </button>
          </span>
        ))}
    </div>
  );
}
