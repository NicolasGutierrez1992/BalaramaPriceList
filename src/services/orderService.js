require("dotenv").config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

export async function sendOrder(cart, token) {
  const res = await fetch("http://${HOST}:${PORT}`/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cart }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al enviar el pedido");
  }

  return data;
}
