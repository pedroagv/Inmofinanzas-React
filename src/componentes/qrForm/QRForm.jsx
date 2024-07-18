import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://127.0.0.1:8000/generate_qr/', formData);
      console.log('QR generado:', response.data);
      setQrImage(response.data.image_base64);
    } catch (error) {
      console.error('Error al generar QR:', error);
    }
  };

  return (
    <div className='container p-5'>
      <form onSubmit={handleSubmit}>
        <label>
          Url para generar el QR: <br />
          <input
            className='form form-control'
            type="text"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className='btn btn-success'>Generar QR</button>
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
