import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';

function UploadImages({ onImagesUpload }) {
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

        try {
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            debugger;
            console.log('Files uploaded successfully:', response.data);
            onImagesUpload(response.data);
            setUploadedImageUrls(response.data.map(image => console.log(image.url))); // Store the URLs of the uploaded images
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className='p-3'>
            <form onSubmit={handleSubmit}>
                <input type="file" className='btn btn-outline-success' multiple onChange={handleFileChange} />
                <button className='btn btn-outline-success' type="submit">Cargar Imágenes del producto</button>
            </form>
            <div>
                {uploadedImageUrls.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                ))}
            </div>
        </div>
    );
}

export default UploadImages;
