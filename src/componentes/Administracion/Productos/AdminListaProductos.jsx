import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../config';

function AdminListaProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/productos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProductos(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (id) => {
        // Lógica para manejar la edición del producto
        console.log(`Editar producto con id: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
          // Llamada a la API para eliminar el producto
          const response = await fetch(`${apiUrl}/productos/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          // Actualizar la lista de productos después de la eliminación
          setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
          alert('Producto eliminado con éxito');
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Error eliminando el producto');
        }
      };
      

    return (
        <div className='container'>
            <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Listado de inmuebles o productos en la BD</h3>
            <table className='table table-striped'>
                <thead class="table-primary">
                    <tr>
                        <th>id</th>
                        <th>Nombre producto</th>
                        <th>Ver</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos && productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>
                                <button className='btn btn-outline-primary' onClick={() => handleEdit(producto.id)}>Ver detalle</button>
                            </td>
                            <td>
                                <button className='btn btn-outline-info' onClick={() => handleEdit(producto.id)}>Editar</button>
                            </td>
                            <td>
                                <button className='btn btn-outline-danger' onClick={() => handleDelete(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminListaProductos;
