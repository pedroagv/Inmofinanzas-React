import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../config';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function FormDinamicoEditarProductos() {
  const { id } = useParams();
  const [CamposIniciales, setCamposIniciales] = useState({});
  const [inputList, setInputList] = useState([]);
  const [newField, setNewField] = useState('');

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`${apiUrl}/productos/${id}`);
        setCamposIniciales(response.data);

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    obtenerProducto();
  }, [id]);

  useEffect(() => {
    let listado = [{ fields: { ...CamposIniciales } }];
    const filteredListado = listado.map(item => {
      const newFields = Object.entries(item.fields)
        .filter(([key]) => key !== 'imagenes' && key !== 'Fecha' && key !== 'carpeta')
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      return { fields: newFields };
    });

    setInputList(filteredListado);
  }, [CamposIniciales]);

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

  const handleRemoveFieldClick = (index, fieldName) => {
    const list = [...inputList];
    delete list[index].fields[fieldName];
    setInputList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      debugger
      const method = 'PUT';
      const url = `${apiUrl}/productos/${inputList[0].fields.id}`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputList[0].fields)
      });

      if (response.ok) {
        alert('Product updated successfully!');
        document.location.href = '/AdminListaProductos'
      } else {
        alert('Error adding/updating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container pt-3'>
    <form onSubmit={handleSubmit}>
      <Link to={'/AdminListaProductos'} className="btn btn-outline-primary" >
        ver Listado de Productos
      </Link>
      <h3 className="font-bold text-dark my-4 border-bottom border-2 text-white">Editando el Producto: {CamposIniciales && CamposIniciales.nombre} </h3>

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

      <button className='btn btn-outline-success text-white' type="submit">Actualizar producto</button>
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
    </div>
  );
}

export default FormDinamicoEditarProductos;
