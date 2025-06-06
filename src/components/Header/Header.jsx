import "./Header.css";
import { ShoppingCart, LogOut } from "lucide-react";

const Header = ({ cartCount, onCartClick, onSearchChange }) => {
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "¿Estás seguro que querés cerrar sesión?"
    );
    if (confirmLogout) {
      localStorage.removeItem("docnum");
      localStorage.removeItem("username");
      localStorage.removeItem("cart");
      window.location.href = "/login";
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/Logo.png" alt="Logo Verdulería" className="logo" />
        <div className="container">
          <input
            className="filtro-input"
            type="text"
            placeholder="Buscar producto..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn" onClick={onCartClick}>
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="icon-btn" onClick={handleLogout}>
          <LogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
