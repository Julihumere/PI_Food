import { Route, Routes } from "react-router-dom";
import Landing from "../Components/Landing/Landing.jsx";
import "./AppRouter.css";
import CreateRecipe from "../Components/CreateRecipe/CreateRecipe.jsx";
import Home from "../Components/Home/Home.jsx";
import RecipeDetail from "../Components/RecipeDetail/RecipeDetail";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/recipes/:id" element={<RecipeDetail />} />
        <Route exact path="/recipe" element={<CreateRecipe />} />
      </Routes>
    </>
  );
}

export default App;
