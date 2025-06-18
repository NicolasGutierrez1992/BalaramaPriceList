const DEV = process.env.NODE_ENV !== "production"; // Verifica si está en modo desarrollo
export async function sendOrder(cart, token, comentario = "") {

  if(DEV){
    console.log("Enviando pedido con los siguientes datos:");
  console.log("Carrito:", cart);
  console.log("Token:", token);
  console.log("Comentario:", comentario);
  }

  if (!cart || cart.length === 0) {
    throw new Error("El carrito está vacío");
  }
  if (!token) {
    throw new Error("Token de autenticación no proporcionado");
  }
  if (typeof comentario !== "string") {
    throw new Error("Comentario debe ser un string");
  }
  if (comentario.length > 500) {
    throw new Error("Comentario demasiado largo, máximo 500 caracteres");
  }
  
const url = (DEV)?'http://localhost:3001': `https://balaramapricelist-devserver.onrender.com`;
 
  // Cambia la URL según el entorno
  const res = await fetch(url + '/api/order', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cart , comentario }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al enviar el pedido");
  }

  return data;
}
