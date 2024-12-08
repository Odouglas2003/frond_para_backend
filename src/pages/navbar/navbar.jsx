import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartModal from "../cartModal/CartModal";
import "./Navbar.css";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    // Actualiza el contador al montar el componente
    updateCartCount();

    // Escucha el evento personalizado y el evento de almacenamiento
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      // Limpia los event listeners al desmontar el componente
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  return (
    <section className="navbar">
      <div className="navbar-logo">
        <Link to="/">MiTienda</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/detalle">Detalle</Link>
        <div className="navbar-cart" onClick={() => setIsCartOpen(true)}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <p>{cartCount}</p>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </section>
  );
};

export default Navbar;
