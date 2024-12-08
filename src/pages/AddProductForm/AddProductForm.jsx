import React, { useState } from "react";
import "./form.css";

export default function AddProductForm({ onClose, onSave }) {
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:3550/api/producto/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el producto");
        }
        return response.json();
      })
      .then((savedProduct) => {
        alert(`Producto "${savedProduct.name}" guardado correctamente.`); // Muestra la alerta
        onSave(savedProduct); // Notifica al padre que se guardó el producto
        setNewProduct({
          id: "",
          name: "",
          description: "",
          price: "",
          stock: "",
          image: "",
        }); // Limpia el formulario
        onClose(); // Cierra el formulario
      })
      .catch((error) => {
        alert(`Error al guardar el producto: ${error.message}`);
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleAddProduct}>
          <label>
            ID:
            <input
              type="text"
              value={newProduct.id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, id: e.target.value })
              }
              required
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            ></textarea>
          </label>
          <label>
            Precio:
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              required
            />
          </label>
          <label>
            Imagen (URL):
            <input
              type="url"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />
          </label>
          <div className="form-actions">
            <button type="submit">Guardar Producto</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
