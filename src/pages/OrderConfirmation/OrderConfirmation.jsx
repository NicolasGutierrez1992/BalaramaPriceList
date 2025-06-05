import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <div className="content">
        <h1>¡Pedido confirmado!</h1>
        <p>
          Hemos recibido tu pedido y comenzamos a procesarlo. El detalle del
          mismo será enviado al correo electrónico asociado a tu cuenta.
        </p>
        <button className="btn" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
