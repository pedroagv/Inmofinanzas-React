import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';

function UploadImages({ onImagesUpload ,folder }) {

    const [files, setFiles] = useState([]);
    
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('folder', folder); // Agregar el nuevo identificador como parte de la solicitud

        try {
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files uploaded successfully:', response.data);
            onImagesUpload(response.data);
            setUploadedImageUrls(response.data.map(image => image.url)); // Store the URLs of the uploaded images
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    

    return (
        <div className='p-3'>
            <form onSubmit={handleSubmit}>
                <p>folder: {folder}</p>
                <input type="file" className='btn btn-outline-success' multiple onChange={handleFileChange} />
                <button className='btn btn-outline-success' type="submit">Cargar Imágenes del producto</button>
            </form>
            <div>
                {uploadedImageUrls.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} style={{ width: '100px', height: '100px', margin: '5px' }} />
                ))}
            </div>
        </div>
    );
}

export default UploadImages;
