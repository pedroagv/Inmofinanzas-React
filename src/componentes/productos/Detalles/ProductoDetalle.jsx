import React from 'react';

const ProductoDetalle = ({ productoData }) => {
    if (!productoData) {
        return <p>El producto no está disponible.</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {productoData.imagenes.map((imagen, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <img src={imagen.src} className="d-block w-100" alt={`Slide ${index}`} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mt-3">
                        <h4>{productoData.descripcion}</h4>
                        {/* Renderizar otros detalles del producto */}
                        {Object.entries(productoData).map(([key, valor]) => (
                            (key !== 'imagenes' && key !== 'descripcion' && key !== 'nombre'
                                && key !== 'id' && key !== 'Fecha' && key !== 'mapa' && key !== 'direccion'
                                && key !== 'carpeta'
                            ) &&
                            <div className='fs-6 badge bg-primary p-2 m-2' key={key}>{key}: {valor}</div>
                        ))}
                    </div>
                </div>
                <div className="col-md-12 p-3">
                    <h3 className="font-bold my-4 border-bottom border-2">Ubicación: {productoData.direccion}</h3>
                    {productoData.mapa && (
                        <iframe
                            width="100%"
                            height="400"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src={productoData.mapa}
                            title="Ubicación en Google Maps"
                        ></iframe>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductoDetalle;
