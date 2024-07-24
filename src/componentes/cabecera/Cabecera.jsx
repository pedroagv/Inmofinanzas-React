import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config';
import './Cabecera.css'; // Importa el archivo de estilos CSS
import { Link } from 'react-router-dom';

function Cabecera() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                // let storedCategorias = localStorage.getItem('categorias');
                // if (storedCategorias) {
                //     setCategorias(JSON.parse(storedCategorias));
                // } else {
                const response = await fetch(`${apiUrl}/categorias`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategorias(data);
                localStorage.setItem('categorias', JSON.stringify(data));
                // }
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Manejar el error según tus necesidades
            }
        };

        fetchCategorias();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white transparent-nav">
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
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Cabecera;
