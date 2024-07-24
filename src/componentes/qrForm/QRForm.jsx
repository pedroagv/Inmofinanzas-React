import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../config';

const QRForm = () => {
  const [formData, setFormData] = useState({
    data: ''
  });
  const [qrImage, setQrImage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/generate_qr/`, formData);
      console.log('QR generado:', response.data);
      setQrImage(response.data.image_base64);
    } catch (error) {
      console.error('Error al generar QR:', error);
    }
  };

  return (
    <div className='container p-5'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputqr">Digite su texto para generar el QR:</label>
        <input
          id='inputqr'
          className='form form-control w-100 mb-3'
          type="text"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
        <button type="submit" className='btn btn-success w-100'>Generar QR</button>
      </form>
      {qrImage && (
        <div>
          <h2>Imagen del código QR generado:</h2>
          <img src={`data:image/png;base64,${qrImage}`} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRForm;
