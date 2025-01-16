import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Viewer from "./pdf/Viewer";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livro" element={<Viewer />} />
      </Routes>
    </Router>
  );
};

export default App;
