import "./CartDrawer.css";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";

function CartDrawer({ cart, onClose, onRemove, onSendOrder }) {
  const total = cart.reduce((acc, item) => {
    const precio = parseFloat(item.precio.replace("$", "")) || 0;
    return acc + precio * item.quantity;
  }, 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <ShoppingCart size={24} />
          Carrito
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">El carrito está vacío.</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <div>
                  <strong>{item.titulo}</strong>
                  <p>
                    {item.quantity} × {item.tipo || "unidad"}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="remove-btn"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>
        <input
          type="text"
          placeholder="Agrega un comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <div className="cart-footer">
          <p>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
          <button onClick={onSendOrder} className="send-btn">
            Enviar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
