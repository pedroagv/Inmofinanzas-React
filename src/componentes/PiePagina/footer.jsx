import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-lg font-bold mb-4">Acerca de nosotros</h3>
                        <p className="text-gray-400 mb-4">Somos una empresa especializada en el alquiler y la venta de apartamentos y casas, así como en la gestión integral de finanzas.</p>
                        <a href="/" className="btn btn-primary">
                            Learn More
                        </a>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-lg font-bold mb-4">Contactenos</h3>
                        <p className="text-gray-400 mb-2">Telefono: +57 3053577310</p>
                        <p className="text-gray-400 mb-2">Email: InmoFinanzasAGV@gmail.com</p>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Suscríbete a nuestro portal para recibir información actualizada sobre nuevas propiedades y temas contables.
                        </p>
                        <form className="d-flex">
                            <input type="email" placeholder="ingrese su correo" className="form-control me-2" />
                            <button type="submit" className="btn btn-primary">Suscribase</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
