import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Viewer from "./pdf/Viewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Viewer />} />
        <Route path="/livro" element={<Viewer />} />
      </Routes>
    </Router>
  );
};

export default App;
