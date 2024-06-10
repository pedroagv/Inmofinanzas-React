import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './componentes/PiePagina/footer';
import Cabecera from './componentes/cabecera/Cabecera';
import RedSocial from './componentes/redes-sociales/RedSocial';
import Home from './componentes/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Cabecera />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/RedesSociales" element={<RedSocial />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
