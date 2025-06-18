import "./CartDrawer.css";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";

function CartDrawer({ cart, onClose, onRemove, onSendOrder, comentario, setComentario, isLoading }) {
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
         <div className="cart-comentario">
          <label htmlFor="comentario" className="cart-comentario-label">
            Comentario para el pedido:
          </label>
          <textarea
            id="comentario"
            className="cart-comentario-textarea"
            placeholder="Agrega un comentario para tu pedido..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={3}
          />
        </div>
        <div className="cart-footer">
          <button onClick={onSendOrder}  disabled={isLoading} className="send-btn">
             {isLoading ? "Enviando..." : "Enviar pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
