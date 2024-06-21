import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductoDetalle from './ProductoDetalle';
import { apiUrl } from '../../../config';
import { useParams } from 'react-router-dom';

const Detalle = () => {
    const { id } = useParams(); // Obtenemos el parámetro id de la URL
    const [productoData, setProductoData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                // Intentar obtener el producto desde localStorage
                const productosLocalStorage = JSON.parse(localStorage.getItem('productos')) || [];
                const productoEncontrado = productosLocalStorage.find(producto => producto.id === id);

                if (productoEncontrado) {
                    setProductoData(productoEncontrado);
                } else {
                    // Si no está en localStorage, realizar la solicitud al servidor
                    const response = await axios.get(`${apiUrl}/productos/${id}`);
                    setProductoData(response.data);

                    // Actualizar localStorage con los productos actualizados (opcional)
                    const nuevosProductos = [...productosLocalStorage, response.data];
                    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
                }
            } catch (error) {
                setError('No se pudo obtener el producto.');
                console.error('Error fetching product:', error);
            }
        };

        obtenerProducto();
    }, [id]);


    return (
        <div className="container">
            <h3 className="font-bold my-4 border-bottom border-2">{productoData && productoData.nombre}</h3>

            {error ? (
                <p>{error}</p>
            ) : (
                <ProductoDetalle productoData={productoData} />
            )}
        </div>
    );
};

export default Detalle;
