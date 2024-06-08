import React from 'react';
import '../cabecera/Cabecera.css';

function Cabecera() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <img src="/imagenes/InmoFinanzas.png" className='navbar-logo' alt="InmoFinanzas Logo" />
                <a class="navbar-brand" href="/">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="/">Ventas</a>
                        <a class="nav-link" href="/">Arriendos</a>
                        <a class="nav-link" href="/">Permutas</a>
                        <a class="nav-link" href="/">Carga documentos</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Cabecera;
