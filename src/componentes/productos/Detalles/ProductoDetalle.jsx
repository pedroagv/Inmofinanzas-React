import React from 'react';
import { capitalizeFirstLetter } from '../../Utilidad/Util';
import { socialMediaData } from '../../redes-sociales/SocialMediaData';

const ProductoDetalle = ({ productoData }) => {
    if (!productoData) {
        return <p>El producto no está disponible.</p>;
    }

    // Método 1: Usando expresiones regulares para encontrar la URL
    var urlRegex = /<iframe.*?src="(.*?)".*?>/; // Expresión regular para capturar la URL dentro del atributo src
    var match = productoData.mapa.match(urlRegex); // Aplicar la expresión regular a la cadena del iframe
    var mapaUrl = match ? match[1] : null;

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
                        <h4 className='m-2'>{productoData.descripcion}</h4>
                        {/* Renderizar otros detalles del producto */}
                        {Object.entries(productoData).map(([key, valor]) => (
                            (key !== 'imagenes' && key !== 'descripcion' && key !== 'nombre'
                                && key !== 'id' && key !== 'Fecha' && key !== 'mapa' && key !== 'direccion'
                                && key !== 'carpeta' && key !== 'imagen_portada'
                            ) &&
                            <div className='fs-6 badge border border-primary p-md-2 m-2' key={key}>
                                <span className='fw-normal'>{capitalizeFirstLetter(key)}: </span><span>{valor}</span>
                            </div>
                        ))}

                        <hr />
                        <h5 className='m-2'>Redes sociales</h5>

                        {socialMediaData.map((button, index) => (
                            <div className='fs-6 badge  p-md-2 m-2' key={index}>
                                <a className={`btn border border-warning text-white`} href={button.href} target="_blank" rel="noopener noreferrer" id={`link-${button.name}`}>
                                    {button.name}
                                </a>
                            </div>
                        ))}


                    </div>
                </div>
                <div className="col-md-12 p-3">
                    <h3 className="font-bold my-4 border-bottom border-2">Ubicación: {productoData.direccion}
                         - Llega con Waze: <a href='https://www.waze.com/live-map/directions/co/bogota/bogota/cl.-70b-120-2?to=place.ChIJhw8oHlCDP44ROj9KcEdqnj8&from=ll.4.7180303%2C-74.1357292&utm_medium=lm_share_directions&utm_campaign=default&utm_source=waze_website'>Ir con Waze</a>

                    </h3>

                    {productoData.mapa && (
                        <iframe
                            width="100%"
                            height="400"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src={mapaUrl}
                            title="Ubicación en Google Maps"
                        ></iframe>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductoDetalle;
