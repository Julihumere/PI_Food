import React from "react";
import "./Loading.css";
import loading from "../../img/loadingGif.gif";

export default function Loading({ setLoading }) {
  return (
    <div>
      <img src={loading} alt="" className="loading" />
      <div className="setLoading">
        {setTimeout(() => {
          setLoading(false);
        }, 3000)}
      </div>
    </div>
  );
}
