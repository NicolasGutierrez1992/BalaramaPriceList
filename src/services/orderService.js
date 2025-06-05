export async function sendOrder(cart, token) {
  const res = await fetch("http://localhost:3001/api/order", {
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
