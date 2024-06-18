import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './componentes/PiePagina/footer';
import Cabecera from './componentes/cabecera/Cabecera';
import RedSocial from './componentes/redes-sociales/RedSocial';
import Home from './componentes/Home/Home';
import CargueProductos from './componentes/Administracion/Productos/CargueProductos';
import AdminListaProductos from './componentes/Administracion/Productos/AdminListaProductos';
import { useEffect } from 'react';
import Detalle from './componentes/productos/Detalles/Detalle';


function App() {
  useEffect(() => {
    document.title = "Inmofinanzas AGV";
  }, []);
  return (
    <Router>
      <div className="App">
        <Cabecera />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/RedesSociales" element={<RedSocial />} />
          <Route path="/AdminCargueProductos" element={<CargueProductos />} />
          <Route path="/AdminListaProductos" element={<AdminListaProductos />} />
          <Route path="/Detalle/:id" element={<Detalle />} />          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
