import React from 'react';

function Nosotros() {
    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <h3 className="font-bold my-4 border-bottom border-2">Acerca de nosotros</h3>
                    <p>
                        Somos una empresa inmobiliaria dedicada a ayudar a nuestros clientes a encontrar la propiedad perfecta.
                        Con años de experiencia en el mercado, hemos construido una reputación sólida por nuestra integridad, profesionalismo y atención personalizada.
                        Nuestro equipo está comprometido en brindar el mejor servicio, desde la búsqueda de la propiedad ideal hasta el cierre de la transacción.
                    </p>
                </div>
                <div className='col-md-6'>
                    <h3 className="font-bold my-4 border-bottom border-2">Nuestros Servicios</h3>

                    <ul>
                        <li>Venta y alquiler de propiedades residenciales y comerciales</li>
                        <li>Asesoramiento en inversiones inmobiliarias</li>
                        <li>Valoración de propiedades</li>
                        <li>Gestión de alquileres</li>
                        <li>Asistencia legal y financiera</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nosotros;
