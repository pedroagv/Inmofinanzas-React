import React, { useState } from 'react';
import { apiUrl } from '../../../config';
import UploadImages from './UploadImages'


function DynamicForm() {

  const CamposIniciales = {
    nombre: '',
    habitaciones: '',
    piso: '',
    estudio: '',
    patio: '',
    estrato: '',
    baños: '',
    deposito: '',
    balcon: '',
    chimenea: '',
    ascensor: '',
    parqueadero: '',
    descripcion: '',
    categoria: '',
    precio: '',
    direccion: '',
    area: ''
  };

  const [inputList, setInputList] = useState([{ id: '', fields: { ...CamposIniciales } }]);

  const [newField, setNewField] = useState('');

  const handleInputChange = (e, index, fieldName) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index].fields[fieldName] = value;
    setInputList(list);
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

  const handleRemoveProductClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
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
        setInputList([{ id: '', fields: {} }]);
      } else {
        alert('Error adding/updating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <a href='/AdminListaProductos' >Lista de Productos</a>

      <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Agregar nuevo producto</h3>

      {inputList.map((product, i) => (
        <div key={i} className='row'>
          {Object.keys(product.fields).map((fieldName, j) => (
            <div key={j} className='col-3'>
              <div class="input-group mb-3">
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

      <UploadImages />

      <button className='btn btn-dark' type="submit">GUARDAR PRODUCTO</button>
      <hr />

      <div className='row'>
        <div className='col-12'>
          <h3>Agregar campos adicionales</h3>
        </div>
        <div className='col-md-12'>
          <input
            type="text"
            className='form form-control'
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

export default DynamicForm;
