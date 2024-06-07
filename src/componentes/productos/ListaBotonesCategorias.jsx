import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config';

function ListaBotonesCategorias() {
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
        <div className='text-center my-4'>

            {categorias && categorias.map(item => (
                <button className='btn bg-boton-inmofinanzas btn-primary ms-5 me-5' key={item.id} onClick={() => console.log(item.categoria)}>
                    {item.categoria}
                </button>
            ))}

        </div>
    );
}

export default ListaBotonesCategorias;
