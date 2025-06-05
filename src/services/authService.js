

const HOST = process.env.HOST || "localhost";

export async function login(docnum, password) {
  const res = await fetch(`${HOST}/api/login`, {
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
