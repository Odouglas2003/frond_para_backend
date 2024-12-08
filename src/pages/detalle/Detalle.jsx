import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detalle.css"; // Asegúrate de tener este archivo

export default function Detalle() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.product) {
    navigate("/");
    return null;
  }

  const { product } = location.state;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtiene el carrito existente o inicializa como vacío

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya existe, incrementa la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si no existe, agrega el producto con cantidad inicial
      cart.push({ ...product, quantity: 1 });
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Producto "${product.name}" agregado al carro`);
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">
        <strong>Precio:</strong> ${product.price}
      </p>
      <p className="stock">
        <strong>Stock:</strong> {product.stock}
      </p>
      <div className="buttons">
        <button onClick={() => navigate("/")}>Volver a la lista</button>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Agregar al Carro
        </button>
      </div>
    </div>
  );
}
