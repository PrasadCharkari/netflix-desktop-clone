import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Tv from "./Pages/Tv";
import Movies from "./Pages/Movies";
import Popular from "./Pages/Popular";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvshows" element={<Tv />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </Router>
  );
}

export default App;
