import React, { useState, useEffect } from "react";
import "./CartModal.css";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  }, [isOpen]);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ).toFixed(2);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    const total = calculateTotal();
  
    const purchaseData = {
      items: cartItems, // Asegúrate de que `cartItems` contenga todos los campos necesarios
      total,
    };
  
    fetch("http://localhost:3550/api/carrito/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar la compra");
        }
        return response.json();
      })
      .then((savedPurchase) => {
        alert(`Compra realizada correctamente. Total: $${total}`);
        setCartItems([]);
        localStorage.removeItem("cart");
        onClose();
      })
      .catch((error) => {
        alert(`Error al realizar la compra: ${error.message}`);
      });
  };
  

  if (!isOpen) return null;

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
        <h2>Tu Carrito</h2>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      Precio: ${item.price.toFixed(2)} | Cantidad: {item.quantity} |
                      Subtotal: ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <h3>Total: ${calculateTotal()}</h3>
            <button className="purchase-button" onClick={handlePurchase}>
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
