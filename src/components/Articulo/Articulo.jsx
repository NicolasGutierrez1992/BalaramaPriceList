import "./Articulo.css";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

function Articulo({
  titulo,
  presentacion,
  unidadMedida,
  cantidad,
  precio,
  preciounitario,
  onClick,
}) {
  const [selectedTipo, setSelectedTipo] = useState("");
  const [cantidadElegida, setCantidadElegida] = useState("");

  const handleAgregar = () => {
    if (cantidadElegida && selectedTipo) {
      onClick({ cantidad: cantidadElegida, tipo: selectedTipo });
      setCantidadElegida("");
      setSelectedTipo("");
    }
  };

  return (
    <div className="articulo">
      <div className="titulo-linea centrado">
        <h2 className="titulo">{titulo.toUpperCase()}</h2>
      </div>

      <div className="info-linea centrado">
        <p className="cantidad">
          {presentacion}: {cantidad} {unidadMedida}
        </p>
      </div>

      <div className="info-linea centrado">
        <p className="precio">Precio: {precio}</p>
      </div>

      <div className="info-linea centrado">
        <p className="preciounitario">Unitario: {preciounitario}</p>
      </div>

      <div className="cantidad-unidad-linea centrado">
        <input
          type="number"
          min="1"
          placeholder="Cantidad"
          value={cantidadElegida}
          onChange={(e) => setCantidadElegida(e.target.value)}
        />

        <select
          value={selectedTipo}
          onChange={(e) => setSelectedTipo(e.target.value)}
        >
          <option value="" disabled>
            -
          </option>
          <option value="bulto">Bulto</option>
          <option value="unidad">Unidad</option>
          <option value="kilo">Kilo</option>
        </select>
      </div>

      <div
        className={`boton-linea centrado ${
          cantidadElegida && selectedTipo ? "" : "disabled"
        }`}
        onClick={cantidadElegida && selectedTipo ? handleAgregar : undefined}
      >
        <ShoppingCart size={18} />
        <span>Agregar</span>
      </div>
    </div>
  );
}

export default Articulo;
