import React, { useState } from 'react';
import { apiUrl } from '../../../config';
import { Link } from 'react-router-dom';

function FormDinamicoCrearProductos() {

  const [folder, setFolder] = useState(generateNewId()); // Set the initial state for folder using generateNewId

  const CamposIniciales = {
    nombre: '',
    habitaciones: '',
    piso: '',
    estudio: '',
    patio: '',
    estrato: '',
    banios: '',
    deposito: '',
    balcon: '',
    chimenea: '',
    ascensor: '',
    parqueadero: '',
    descripcion: '',
    categoria: 'Arriendo, Ventas, Permurtas',
    precio: '',
    direccion: '',
    area: '',
    destacado: null,
    // carpeta: folder,
    Fecha: new Date().toLocaleString(),
    mapa: ''
  };


  const [inputList, setInputList] = useState([{ id: '', fields: { ...CamposIniciales } }]);
  const [newField, setNewField] = useState('');

  const handleInputChange = (e, index, fieldName) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index].fields[fieldName] = value;
    setInputList(list);
  };

  function generateNewId() {
    // Generar un nuevo identificador único utilizando el timestamp actual
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleAddField = (index) => {
    const fieldName = newField.trim();
    if (fieldName) {
      const list = [...inputList];
      list[index].fields[fieldName] = '';
      setInputList(list);
      setNewField('');
    }
  };

  const handleRemoveFieldClick = (index, fieldName) => {
    const list = [...inputList];
    delete list[index].fields[fieldName];
    setInputList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = inputList.length === 1 && inputList[0].id ? 'PUT' : 'POST';
      const url = method === 'PUT' ? `${apiUrl}/productos/${inputList[0].id}` : `${apiUrl}/productos`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(method === 'PUT' ? inputList[0].fields : inputList.map(item => item.fields))
      });

      if (response.ok) {
        alert(method === 'PUT' ? 'Product updated successfully!' : 'Products added successfully!');
        document.location.href = '/AdminListaProductos'
      } else {
        alert('Error adding/updating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <Link to={'/AdminListaProductos'} className="btn btn-outline-primary" >
        ver Listado de Productos
      </Link>

      <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Agregar nuevo producto</h3>

      {inputList.map((product, i) => (
        <div key={i} className='row'>
          {Object.keys(product.fields).map((fieldName, j) => (
            <div key={j} className='col-12 col-sm-6 col-md-6'>
              <div className="input-group mb-3">
                <span class="input-group-text labelAdmin" id="label-for-field-0-0">{fieldName}:</span>
                <input
                  id={`field-${i}-${j}`}
                  className='form-control'
                  name={fieldName}
                  placeholder={fieldName}
                  value={product.fields[fieldName]}
                  onChange={(e) => handleInputChange(e, i, fieldName)}
                />
                <button type="button" className='btn btn-outline-danger input-group-text' onClick={() => handleRemoveFieldClick(i, fieldName)}>X</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <button className='btn btn-outline-success text-white' type="submit">Guardar nuevo producto</button>
      <hr />

      <div className='row'>
        <div className='col-12'>
          <h3>Agregar campos adicionales</h3>
        </div>
        <div className='col-md-12'>
          <input
            type="text"
            className='form form-control mb-2'
            placeholder='Agregue un nuevos campos adicionales para el producto: ejemplo baños, habitaciones, parqueadero, jardin etc'
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
          />
          <button type="button" className='btn btn-outline-info' onClick={() => handleAddField(0)}>Agregar un nuevo campo</button>
        </div>
      </div>
    </form>
  );
}

export default FormDinamicoCrearProductos;
