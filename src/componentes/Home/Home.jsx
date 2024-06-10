import React from 'react';
import SliderPropiedadesDestacadas from '../slider/SliderPropiedadesDestacadas';
import ListaProductos from '../productos/ListaProductos';
import ListaArriendos from '../productos/ListaArriendos';
import Nosotros from '../Empresa/Nosotros';
import Brokers from '../Empresa/Brokers';

function Home() {
    return (
        <div className='container'>
            <SliderPropiedadesDestacadas />
            <ListaProductos />
            <ListaArriendos />
            <Nosotros />
            <Brokers />
        </div>
    )
}

export default Home;
