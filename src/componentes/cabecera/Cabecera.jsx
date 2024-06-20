import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config';
import '../cabecera/Cabecera.css';
import { Link } from 'react-router-dom';

function Cabecera() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/categorias`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCategorias(data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src="/imagenes/InmoFinanzas.png" className='navbar-logo' alt="InmoFinanzas Logo" />
                <Link to={`/`} className="m-1 navbar-brand color-navbar-brand fw-bold" >
                    InmoFinanzasAGV
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        {categorias && categorias.map(item => (
                            <Link key={item.id} id={item.id} to={item.link} className="nav-link fw-bolder">
                                {item.categoria}
                            </Link>
                            // <a key={item.id} id={item.id} className="nav-link fw-bolder" href={item.link}>{item.categoria}</a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Cabecera;
