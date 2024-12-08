import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../AddProductForm/AddProductForm"; // Importa el formulario
import "./pro.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Controla la visibilidad del formulario
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3550/api/producto/Producto")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSaveProduct = (savedProduct) => {
    setProducts((prevProducts) => [...prevProducts, savedProduct]);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error}</p>;
  }

  return (
    <div className="product-list">
      <button className="add-product-button" onClick={() => setShowForm(true)}>
        Agregar Producto
      </button>

      {showForm && (
        <AddProductForm
          onClose={() => setShowForm(false)}
          onSave={handleSaveProduct}
        />
      )}

      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <h2>{product.name}</h2>
          <p>
            <strong>Precio:</strong> ${product.price}
          </p>
          <div className="boton">
            <button
              className="add-to-cart-button"
              onClick={() => navigate("/detalle", { state: { product } })}
            >
              Ver más Detalle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
