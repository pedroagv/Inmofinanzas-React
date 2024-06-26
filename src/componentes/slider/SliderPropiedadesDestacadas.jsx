import { React, useEffect, useState } from 'react';
import '../slider/SliderPropiedadesDestacadas.css';
import { apiUrl } from '../../config';
import { Link } from 'react-router-dom';

function SliderPropiedadesDestacadas() {
    // const [carouselItems, setCarouselItems] = useState([]);
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

    const handleClick = (productId) => {
        // Navigate programmatically to the detail page
        window.location.href = `/Detalle/${productId}`;
    };

    return (
        <div className='container mb-5'>
            {/* <h3 className="font-bold my-4 p-3 text-color-inmofinanzas bg-titulo-inmofinanzas text-center">Propiedades destacadas</h3> */}
            <h3 className="font-bold my-4 border-bottom border-2">Propiedades destacadas</h3>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {productos.filter(filtro => filtro.destacado === 'true').map((product, index) => (
                        <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : ""} aria-label={`Slide ${index + 1}`}></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {productos.filter(filtro => filtro.destacado === 'true').map((product, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} >
                            <Link to={`/Detalle/${product.id}`} >
                                <img src={product?.imagen_portada == null ? product.imagenes[0].src : product?.imagen_portada} className="d-block w-100" alt={product.nombre} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{product.nombre}</h5>
                                    <p>{product.descripcion}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default SliderPropiedadesDestacadas;
