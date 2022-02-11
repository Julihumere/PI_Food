import { Route, Routes } from "react-router-dom";
import Landing from "../Components/Landing/Landing.jsx";
import HomeRouter from "../Router/HomeRouter";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/*" element={<HomeRouter />} />
      </Routes>
    </>
  );
}

export default App;
