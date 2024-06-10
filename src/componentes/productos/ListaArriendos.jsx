import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config';



const ListaArriendos = () => {
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

    return (
        <div className="container color-fondo-seccion p-5" >
            {/* <h3 className='mb-3'>Arriendos</h3> */}
            <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Arriendos</h3>
            <div className="row">
                {productos && productos.filter(producto => producto.categoria === 'Arriendos').map(producto => (
                    <div key={producto.id} className="col-md-4">
                        <div className="card mb-4">
                            <div id={`carouselExampleIndicators${producto.id}`} className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {producto.imagenes.map((imagen, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={imagen.src} className="d-block w-100 card-img-size" alt={`imagen-${index}`} />
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
                                    <p className='font-bold text-primary'>${producto.precio}/ Mensual</p>
                                    <button className="btn btn-dark" >Ver Detalles</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaArriendos;
