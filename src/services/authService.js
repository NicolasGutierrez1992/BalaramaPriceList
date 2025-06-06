

const HOST_API = process.env.HOST_API || "localhost";
export async function login(docnum, password) {
  console.log("docnum:", docnum);
  console.log("password:", password);
  const res = await fetch(`https://balaramapricelist-devserver.onrender.com/api/login`, {
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
