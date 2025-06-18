const pool = require("../config/db");

const getOrderByIdUser = async (idClient) => {
  const query = "SELECT * FROM pedido WHERE id_Client = $1";
  const result = await pool.query(query, [idClient]);
  return result.rows[0];
};

//Query para insertar orden a la tabla pedido
//INSERT INTO public.pedido(id_pedido, id_cliente, cantidaditems, fecharecepcion, estado)VALUES (?, ?, ?, ?, ?);
const createOrder = async (orderData) => {
  
  //Obtenemos el ultimo id_pedido para asignar el nuevo id_pedido
  const lastOrderQuery = "SELECT id_pedido FROM pedido ORDER BY id_pedido DESC LIMIT 1";
    const lastOrderResult = await pool.query(lastOrderQuery);
    const lastOrderId = lastOrderResult.rows[0] ? lastOrderResult.rows[0].id_pedido : 0;
    const newOrderId = lastOrderId + 1; // Incrementamos el último ID para el nuevo pedido
    
    const { id_Client, cantidaditems, fecharecepcion, estado, comentario } = orderData;


  const query = `
    INSERT INTO pedido (id_pedido, id_Cliente, cantidaditems, fecharecepcion, estado, comentario)
    VALUES ($1, $2, $3, $4 , $5, $6)
    RETURNING *
  `;
  console.log(query);

  const values = [newOrderId, id_Client, cantidaditems, fecharecepcion, estado , comentario];
  const result = await pool.query(query, values);
  // Devolvemos el nuevo pedido creado
  console.log("Nuevo pedido creado:", result.rows[0]);  
  return result.rows[0];
};


//Query para insertar el detalle de la orden a la tabla pedidoDetalle
//INSERT INTO public.pedidodetalle(	id_pedido, id_articulo, cantidad, presentacion)	VALUES (?, ?, ?, ?);
const createOrderDetail = async (orderDetailData) => {
  const { id_pedido, id_articulo, cantidad, presentacion } = orderDetailData;

  const query = `
    INSERT INTO pedidodetalle (id_pedido, id_articulo, cantidad, presentacion)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [id_pedido, id_articulo, cantidad, presentacion];
  const result = await pool.query(query, values);
    // Devolvemos el detalle del pedido creado
    console.log("Detalle del pedido creado:", result.rows[0]);
  return result.rows[0];
};

module.exports = {
    getOrderByIdUser,
    createOrder,
    createOrderDetail
};
