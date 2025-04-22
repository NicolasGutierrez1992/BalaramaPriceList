import React from "react";
import "./Articulo.css"; // Importa los estilos desde un archivo CSS

function Articulo({ titulo, presentacion, cantidad, precio, preciounitario, onClick }) {
    return (
        <div
            className="articulo"
            onClick={onClick}
        >
            <h2 className="titulo">{titulo.toUpperCase()}</h2>
            <p className="presentacion">Presentación: {presentacion.toUpperCase()}</p>
            <p className="cantidad">Cantidad: {cantidad}</p>
            <p className="precio">Precio: {precio}</p>
            <p className="preciounitario">Precio Unitario: {preciounitario}</p>
        </div>
    );
}

export default Articulo;