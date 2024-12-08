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

  if (!isOpen) return null;

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ).toFixed(2);
  };

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
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
