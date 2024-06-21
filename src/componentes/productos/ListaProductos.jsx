import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiUrl } from '../../config';
import { Link } from 'react-router-dom';
// import ListaBotonesCategorias from './ListaBotonesCategorias';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                let storedProductos = localStorage.getItem('productos');
                if (storedProductos) {
                    setProductos(JSON.parse(storedProductos));
                } else {
                    const response = await fetch(`${apiUrl}/productos`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setProductos(data);
                    localStorage.setItem('productos', JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                // Manejar el error según tus necesidades
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="container color-fondo-seccion p-2 p-md-5 mb-5">
            {/* <h3 className="my-4 p-3 text-color-inmofinanzas bg-titulo-inmofinanzas text-center">Nuestros productos inmobiliarios</h3> */}
            <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Nuestros productos inmobiliarios</h3>
            {/* <ListaBotonesCategorias /> */}
            <div className="row">
                {productos && productos.map(producto => (
                    <div key={producto.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card mb-4">
                            <div id={`carouselExampleIndicators${producto.id}`} className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {producto.imagenes.map((imagen, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={imagen.src} className="d-block w-100 card-img-size img-thumbnail" alt={`imagen-${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${producto.id}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${producto.id}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <div className='d-flex justify-content-between'>
                                    <Link to={`/Detalle/${producto.id}`} className="btn btn-dark">
                                        Ver Detalles
                                    </Link>
                                    <button className="btn btn-outline-dark" >Contactenos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaProductos;
