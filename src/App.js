//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Articulo from "./Articulo";





function App() {
  const [articulos, setArticulos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const handleClick = (titulo) => {
    // alert(`Has hecho clic en el artículo: ${titulo}`);
  };

  useEffect(() => {
    const SHEET_ID = "1CPz6JYxp-5kBJlfLZtgudQ_Jndi23U8cT5S0bkjEnj8"; // Sustituye con el ID de tu hoja
    const API_KEY = "AIzaSyBCTT-GTrp6ONC5vgOQOcVJwXvOcj4dRq8"; // Sustituye con tu clave API
    const SHEET_NAME = "LISTA"; // El nombre de la pestaña en Google Sheets

    //`https://docs.google.com/spreadsheets/d/1CPz6JYxp-5kBJlfLZtgudQ_Jndi23U8cT5S0bkjEnj8/edit?usp=sharing
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;


    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const rows = data.values; // Los datos se entregan en formato de filas
        const json = rows.slice(1).map((row, index) => ({
          id: row[0],//  columna ID
          titulo: row[1], //  columna Nombre
          presentacion: row[2], //  columna Presentacion
          cantidad: row[3], //  columna Cantidad
          unidadMedida: row[4], //  columna UnidadMedida
          precioReal: row[5], //  columna PrecioReal
          precio: row[6],//  columna Precio ConDecuento
          preciounitario: row[7] //  columna PrecioUnitario
        }));
        setArticulos(json); // Aquí tienes tu lista de precios en JSON
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);
  const articulosFiltrados = articulos.filter(articulo =>
    articulo.titulo &&  articulo.titulo.toLowerCase().startsWith(busqueda.trim().toLowerCase())

  );
  return (

    <div className="App">
      {/* Encabezado con logo */}
       <header className="header">
        <div className="header-flex">
          <div className="header-logo">
            <img src="/logo.png" alt="Logo Verdulería" className="logo" />
          </div>
          <div className="header-center">
            <h1 className="titulo-header">
              DISTRIBUIDORA BALARAMA<br />Lista de Precios 
            </h1>
            <input
              type="text"
              placeholder="Buscar por título..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="buscador"
            />
          </div>
          <div className="header-empty"></div>
        </div>
      </header>
      <div className="container">

        {articulosFiltrados.map((articulo) => (
          <Articulo
            key={articulo.id}
            titulo={articulo.titulo}
            presentacion={articulo.presentacion}
            unidadMedida={articulo.unidadMedida}
            cantidad={articulo.cantidad}
            precio={(articulo.precio.toString() === "$0.00") ? "CONSULTAR" : articulo.precio}
            preciounitario={(articulo.preciounitario.toString() === "$0.00") ? "CONSULTAR" : articulo.preciounitario}
            onClick={() => handleClick(articulo.titulo)}
          />
        ))}
      </div>
         <a
          href="https://wa.me/5491150172848" // Reemplaza por tu número, por ejemplo: 5491122334455
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar WhatsApp"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="whatsapp-icon"
          />
        </a>
    </div>
  );
}

export default App;
