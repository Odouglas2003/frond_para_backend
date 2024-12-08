import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/navbar";
import ProductList from "./pages/produc/ProductList";
import Detalle from "./pages/detalle/Detalle";
import "./App.css";

export default function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/detalle" element={<Detalle />} />
        </Routes>
      </main>
    </Router>
  );
}
