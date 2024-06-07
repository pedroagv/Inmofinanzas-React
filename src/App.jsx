import './App.css';
import Brokers from './componentes/Empresa/Brokers';
import Nosotros from './componentes/Empresa/Nosotros';
import Footer from './componentes/PiePagina/footer';
import Cabecera from './componentes/cabecera/Cabecera';
import ListaArriendos from './componentes/productos/ListaArriendos';
import ListaProductos from './componentes/productos/ListaProductos';
import SliderPropiedadesDestacadas from './componentes/slider/SliderPropiedadesDestacadas';

function App() {
  return (
    <div className="App">
      <Cabecera />
      <SliderPropiedadesDestacadas />
      <ListaProductos />
      <ListaArriendos />
      <Nosotros />
      <Brokers />
      <Footer />
    </div>
  );
}

export default App;
