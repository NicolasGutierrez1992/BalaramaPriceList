//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Articulo from "./Articulo";





function App() {
  const [articulos, setArticulos] = useState([]);
  const handleClick = (titulo) => {
    // alert(`Has hecho clic en el artículo: ${titulo}`);
  };

  useEffect(() => {
    const SHEET_ID = "1CPz6JYxp-5kBJlfLZtgudQ_Jndi23U8cT5S0bkjEnj8"; // Sustituye con el ID de tu hoja
    const API_KEY = "AIzaSyBCTT-GTrp6ONC5vgOQOcVJwXvOcj4dRq8"; // Sustituye con tu clave API
    const SHEET_NAME = "DBLIST"; // El nombre de la pestaña en Google Sheets

    //`https://docs.google.com/spreadsheets/d/1CPz6JYxp-5kBJlfLZtgudQ_Jndi23U8cT5S0bkjEnj8/edit?usp=sharing
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;


    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const rows = data.values; // Los datos se entregan en formato de filas
        const json = rows.slice(1).map((row, index) => ({
          id: row[0],
          titulo: row[1], // Primera columna
          presentacion: row[2], // Segunda columna
          cantidad: row[3], // Primera columna
          precio: row[5], // Segunda columna
          preciounitario: row[6], // Segunda columna
        }));
        setArticulos(json); // Aquí tienes tu lista de precios en JSON
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);
  return (

    <div className="App">
      {/* Encabezado con logo */}
      <header className="header">
        <img src="/logo.png" alt="Logo Verdulería" className="logo" />
        <h1>Lista de Precios - Verdulería</h1>
      </header>
      <div className="container">

        {articulos.map((articulo) => (
          <Articulo
            key={articulo.id}
            titulo={articulo.titulo}
            presentacion={articulo.presentacion}
            cantidad={articulo.cantidad}
            precio={articulo.precio}
            preciounitario={articulo.preciounitario}
            onClick={() => handleClick(articulo.titulo)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
