import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config';
import '../cabecera/Cabecera.css';

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
                <a className="navbar-brand" href="/">InmoFinanzasAGV</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {
                            categorias && categorias.map(item => (
                                <a id={item.id} className="nav-link" href={item.link}>{item.categoria}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Cabecera;
