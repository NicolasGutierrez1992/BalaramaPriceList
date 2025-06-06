import "./Home.css";
import React, { useState, useEffect } from "react";
import Articulo from "../../components/Articulo/Articulo";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { fetchArticulos } from "../../services/sheetService";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { sendOrder } from "../../services/orderService";

function App() {
  const [articulos, setArticulos] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [filterText, setFilterText] = useState("");

  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  useEffect(() => {
    fetchArticulos().then(setArticulos);
  }, []);

  const handleClick = (articulo) => {
    const cantidad = Number(articulo.cantidad);
    if (!cantidad || cantidad <= 0) return;

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === articulo.id && item.tipo === articulo.tipo
      );

      let updatedCart;

      if (existing) {
        updatedCart = prevCart.map((item) =>
          item.id === articulo.id && item.tipo === articulo.tipo
            ? { ...item, quantity: item.quantity + cantidad }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...articulo, quantity: cantidad }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const filteredArticulos = articulos.filter((a) =>
    a.titulo.toLowerCase().includes(filterText.toLowerCase())
  );

  // Función para enviar el pedido
  const handleSendOrder = async () => {
    const token = localStorage.getItem("token");
    const docnum = localStorage.getItem("docnum");

    if (!token || !docnum) {
      alert("No estás logueado. Por favor ingresá para enviar el pedido.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      await sendOrder(cart, token);
      alert("Pedido enviado con éxito 🎉");
      setCart([]);
      localStorage.removeItem("cart");
      setShowCart(false);
    } catch (error) {
      alert("Error enviando pedido: " + error.message);
    }
  };

  return (
    <div className="App">
      <Header
        cartCount={cart.length}
        onCartClick={toggleCart}
        onSearchChange={setFilterText}
      />

      <div className="lista-articulos">
        {filteredArticulos.map((articulo) => (
          <Articulo
            key={articulo.id}
            titulo={articulo.titulo}
            presentacion={articulo.presentacion}
            unidadMedida={articulo.unidadMedida}
            cantidad={articulo.cantidad}
            precio={
              articulo.precio.toString() === "$0.00"
                ? "CONSULTAR"
                : articulo.precio
            }
            preciounitario={
              articulo.preciounitario.toString() === "$0.00"
                ? "CONSULTAR"
                : articulo.preciounitario
            }
            onClick={({ cantidad, tipo }) =>
              handleClick({ ...articulo, cantidad, tipo })
            }
          />
        ))}
      </div>
      <Footer />
      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={toggleCart}
          onRemove={(id) =>
            setCart((prev) => {
              const updated = prev.filter((item) => item.id !== id);
              localStorage.setItem("cart", JSON.stringify(updated));
              return updated;
            })
          }
          onSendOrder={handleSendOrder}
        />
      )}
    </div>
  );
}

export default App;
