const DEV = process.env.NODE_ENV !== "production"; // Verifica si está en modo desarrollo
 
const url = (DEV)?'http://localhost:3001': `https://balaramapricelist-devserver.onrender.com`;
export async function login(docnum, password) {
  console.log("docnum:", docnum);
  console.log("password:", password);

  const res = await fetch(url+`/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docnum, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al iniciar sesión");
  }

  return data;
}
